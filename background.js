import { getFeed } from './src/js/class/Feed.class.js';
import getLanguages from './src/js/class/Language.class.js';
import Topic from './src/js/class/Topic.class.js';
import Card from './src/js/class/Card.class.js';
import getProducts from './src/js/class/Product.class.js';

let products = getProducts();
let feed = getFeed();
let languages = getLanguages();
let lastUpdate;
let requestTopics;
let user;
let lastTopic;

let defaultProducts = products.filter(obj => {
    return obj.active == true;
});

let language = languages.filter(function (obj) {
    return obj.active == true;
})[0];

const filename = 'tccenter.json';
const requestCards = new Request('https://ficheandtricks.vicandtips.fr/' + filename + '?' + Date.now());

chrome.alarms.create("feed", {
    delayInMinutes: 0,
    periodInMinutes: 0.5
});

chrome.alarms.create("cards", {
    delayInMinutes: 0,
    periodInMinutes: 100
});

function syncCards() {
    chrome.storage.sync.get({
        cards: []
    }, items => {
        initCards(items);
    });
}

function syncFeed() {
    chrome.storage.sync.get({
        language: language,
        feed: feed,
        lastUpdateFeed: new Date((new Date()).getTime() - 30000 * 60).toString(),
        user: null,
        lastTopic: null
    }, items => {
        initFeed(items);
    });
}

syncCards();
syncFeed();

chrome.alarms.onAlarm.addListener(alarms => {
    if (alarms.name == "feed") {
        syncFeed();
    } else if (alarms.name == "cards") {
        syncCards();
    }
});

function initCards(datas) {

    fetch(requestCards)

        /* Check success */

        .then(response => {

            if (response.status != 200) {
                throw new Error("API failed !");
            } else {
                return response;
            }

        })

        /* Transform to JSON */

        .then(response => {
            return response.json();
        })

        /* Transform success ? */

        .catch(() => {
            throw new Error("API failed !");
        })

        .then(cards => {
            chrome.storage.local.set({
                cards: cards
            });
        });

}

function initFeed(datas) {

    language = datas.language;
    feed = datas.feed;
    lastUpdate = (datas.lastUpdateFeed instanceof Date) ? datas.lastUpdateFeed : new Date(datas.lastUpdateFeed);
    user = datas.user;
    lastTopic = datas.lastTopic

    if (language.iso == 'en') {
        feed.product.param = (feed.product.param == 'webmaster') ? 'webmasters' : feed.product.param;
        requestTopics = 'https://productforums.google.com/forum/feed/' + feed.product.param + '/' + feed.content + '/rss.xml?num=3';
    } else {
        requestTopics = 'https://productforums.google.com/forum/feed/' + feed.product.param + '-' + language.iso + '/' + feed.content + '/rss.xml?num=3';
    }

    if (feed.active) {

        fetch(requestTopics)

            .then(function (response) {

                if (response.status != 200) {

                    // var message = 'Feed RSS failed, please contact the web developer';

                    // if (response.status == 500 || response.status == 400) {
                    //     message = feed.product.name + ' forum (' + language.name + ') doesn\'t exist. RSS feed is disabled';
                    //     feed.active = false;

                    // } else if (response.status == 503) {
                    //     message = 'Stop spamming. Please, reload in a few seconds';
                    // }

                    throw new Error(response.status);
                } else {
                    return response;
                }

            })

            .catch(error => {
                feed.status = parseInt(error.message)
                chrome.storage.sync.set({
                    feed: feed
                });
                console.error(error);
                throw new Error("RSS Feed failed !");
            })

            /* Transform to text */

            .then(response => {
                return response.text()
            })

            /* Parse XML to DOM */

            .then(text => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(text, "text/xml");
                return xmlDoc.getElementsByTagName("rss")[0].getElementsByTagName('channel')[0].children;
            })

            /* Transform to an array */

            .then(topic => {
                topic = Array.prototype.slice.call(topic);

                return topic;
            })

            /**
             * Transform 'item' tag to a Topic
             * return [Topic]
             */

            .then(topic => {

                function findItem(topic) {
                    return topic.tagName == 'item';
                }

                return topic.filter(findItem).map(elem => {
                    return new Topic(elem);
                });
            })

            /**
             * Check last date updated
             * return [Topic]
             */

            .then(topics => {

                function checkDate(elem) {
                    let topicDate = new Date(elem.date);
                    elem.new = topicDate > lastUpdate;

                    return elem;
                }

                return topics.map(checkDate);

            })

            /**
             * Check if topic exist in storage
             * return [Topic]
             */

            .then(topics => {

                function topicAlreadyExists(topic) {
                    let index = feed.topics.findIndex(elem => elem.date === topic.date);

                    if (index >= 0) {
                        topic.visited = feed.topics[index].visited;
                        topic.new = feed.topics[index].new;
                    }

                    return topic;
                }

               return topics.map(topicAlreadyExists);
            })

            /**
             * Check author
             * return [Topic]
             */

            .then(topics => {

                function checkAuthor(topic) {
                    if (topic.new) {
                        topic.new = (user.name != topic.author);
                    }
                    if (!topic.visited) {
                        topic.visited = (user.name == topic.author);
                    }
                    return topic;
                }

                return (user != null) ? topics.map(checkAuthor) : topics;
            })

            /**
             * Send topics to storage
             * return [Topic]
             */

            .then(topics => {

                feed.topics = topics;
                chrome.storage.sync.set({
                    feed: feed
                });

                return topics;
            })

            /**
             * Get last topic
             */

            .then(topics => {

                let newTopics = topics.filter(topic => {
                    return topic.new;
                });

                if (newTopics.length > 0) {

                    chrome.browserAction.setBadgeText({
                        text: newTopics.length.toString()
                    });

                    chrome.storage.sync.set({
                        lastTopic: newTopics[0]
                    });

                    if (lastTopic) {

                        if (newTopics[0].date != lastTopic.date) {

                            let idNotif = (Math.floor(Math.random() * (1000000000 - 1 + 1)) + 1).toString();



                            chrome.notifications.create(idNotif, {
                                title: (newTopics[0].title.length > 20) ? newTopics[0].title.slice(0, 20) : newTopics[0].title,
                                type: 'basic',
                                iconUrl: 'src/products/192/'+feed.product.img+'.png',
                                message: (newTopics[0].description.length > 30) ? newTopics[0].description.slice(0, 30) : newTopics[0].description,
                                isClickable: true,
                                contextMessage: newTopics[0].url,
                                requireInteraction: false,
                            }, idNotif => {

                                chrome.notifications.onClicked.addListener(function (id) {

                                    if (id == idNotif) {

                                        chrome.notifications.clear(idNotif, () => {

                                            let index = topics.findIndex(elem => elem.id === newTopics[0].id);

                                            topics[index].visited = true;
                                            topics[index].redirection(true);
                                            topics[index].new = false;

                                            chrome.browserAction.getBadgeText({}, (nbNew) => {

                                                nbNew = (nbNew > 0) ? (parseInt(nbNew) - 1) : '';
                                                nbNew = (nbNew === 0) ? '' : nbNew;

                                                chrome.browserAction.setBadgeText({
                                                    text: nbNew.toString()
                                                });

                                                feed.topics = topics;

                                                chrome.storage.sync.set({
                                                    feed: feed
                                                });
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    }
                }
            });
    }
};