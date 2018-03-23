/**
 *
 * Background file
 * Contact me if you need some explanation
 *
 */

import { getFeed } from './src/js/class/Feed.class.js';
import getLanguages from './src/js/class/Language.class.js';
import getSearch from './src/js/class/Search.class.js';
import Topic from './src/js/class/Topic.class.js';
import Card from './src/js/class/Card.class.js';
import getProducts from './src/js/class/Product.class.js';

const ALARM_FEED = {
    name: "feed",
    delay: 1,
    period: 1
}

const ALARM_CARDS = {
    name: "cards",
    delay: 1,
    period: 90
}

let products = getProducts();
let feed = getFeed();
let languages = getLanguages();
let search = getSearch();
let lastUpdate;
let requestTopics;
let user;
let lastTopic;

let defaultProducts = products.filter(obj => obj.active == true);
let language = languages.filter(obj => obj.active == true)[0];

const filename = 'tccenter.json';
const requestCards = new Request(`https://tc-center.victor-de-la-fouchardiere.fr/${filename}?${Date.now()}`);

/**
 * Verif version extension chrome
 * ?? reset default options
 */

const version = 1;

chrome.storage.sync.get({
    version: version - 1,
}, items => {
    if (version != items.version) {

        chrome.storage.sync.set({
            language: language,
            products: defaultProducts,
            feed: feed,
            search: search,
            version: version,
            lastUpdateFeed: null,
            user: null,
            lastTopic: null
        });

        chrome.browserAction.setBadgeText({
            text: ''
        });
    }
});


/**
 * Launch alarm feed
 */

chrome.alarms.create(ALARM_FEED.name, {
    delayInMinutes: ALARM_FEED.delay,
    periodInMinutes: ALARM_FEED.period
});

/**
 * Launch alarm cards
 */

chrome.alarms.create(ALARM_CARDS.name, {
    delayInMinutes: ALARM_CARDS.delay,
    periodInMinutes: ALARM_CARDS.period
});

function syncCards() {
    chrome.storage.sync.get({
        cards: []
    }, items => {
        initCards(items);
    });
}

/**
 * If user edit his feed options.
 * Launch SyncFeed
 */

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

chrome.runtime.onMessage.addListener(message => {
    if (message && message.update == 'feed') {
        chrome.alarms.clear(ALARM_FEED.name);
        delay(() => {
            syncFeed();
            chrome.alarms.create(ALARM_FEED.name, {
                delayInMinutes: ALARM_FEED.delay,
                periodInMinutes: ALARM_FEED.period
            });
        }, 3000);
    }
});

function syncFeed() {
    chrome.storage.sync.get({
        language: language,
        feed: feed,
        lastUpdateFeed: null,
        user: null,
        lastTopic: null
    }, items => {
        initFeed(items);
    });
}

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

        .then(response => response.json())

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
    lastUpdate = (datas.lastUpdateFeed === null) ? null : new Date(datas.lastUpdateFeed);
    user = datas.user;
    lastTopic = datas.lastTopic;

    if (language.iso == 'en') {
        feed.product.param = (feed.product.param == 'webmaster') ? 'webmasters' : feed.product.param;
        requestTopics = `https://productforums.google.com/forum/feed/${feed.product.param}/${feed.content}/rss.xml?num=${feed.number}`;
    } else {
        requestTopics = `https://productforums.google.com/forum/feed/${feed.product.param}-${language.iso}/${feed.content}/rss.xml?num=${feed.number}`;
    }

    if (feed.active) {

        fetch(requestTopics)

            /**
             * No internet connection ?
             */

            .catch(e => {
                return;
            })

            /**
             * Another error ?
             */

            .then(response => {

                if (!response) {
                    feed.status = 999;
                    throw new Error(999);
                }

                feed.status = parseInt(response.status);

                if (response.status != 200) {
                    throw new Error(response.status);
                } else {
                    return response;
                }

            })

            .catch(error => {
                chrome.storage.sync.set({
                    feed: feed
                });
                throw new Error("RSS Feed failed !");
            })

            /* Transform to text */

            .then(response => response.text())

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

                return topic.filter(findItem).map(elem => new Topic(elem));
            })

            /**
             * Check last date updated
             * return [Topic]
             */

            .then(topics => {

                function checkDate(elem) {
                    let topicDate = new Date(elem.date);
                    elem.new = (lastUpdate) ? (topicDate > lastUpdate) : true;
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

                let popupOpened = !!(chrome.extension.getViews({ type: "popup" }).length);

                if (popupOpened && feed.topics.length != 0) {
                    return false;
                } else {
                    feed.topics = topics;
                    chrome.storage.sync.set({
                        feed: feed
                    });
                    return topics;
                }
            })

            /**
             * Get last topic
             */

            .then(topics => {

                if (topics === false) {
                    return false;
                }

                let newTopics = topics.filter(topic => topic.new);

                if (newTopics.length > 0) {

                    chrome.browserAction.setBadgeText({
                        text: newTopics.length.toString()
                    });

                    chrome.storage.sync.set({
                        lastTopic: newTopics[0]
                    });

                    if (lastTopic && feed.notification) {

                        if (newTopics[0].date != lastTopic.date) {

                            let idNotif = (Math.floor(Math.random() * (1000000000 - 1 + 1)) + 1).toString();

                            chrome.notifications.create(idNotif, {

                                title: (newTopics[0].title.length > 20) ? newTopics[0].title.slice(0, 20) : newTopics[0].title,
                                type: 'basic',
                                iconUrl: `src/products/192/${feed.product.img}.png`,
                                message: (newTopics[0].description.length > 35) ? newTopics[0].description.slice(0, 35)+'...' : newTopics[0].description,
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

syncCards();
syncFeed();