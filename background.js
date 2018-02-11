import { getFeed } from './src/js/class/Feed.class.js';
import getLanguages from './src/js/class/Language.class.js';
import Topic from './src/js/class/Topic.class.js';

let feed = getFeed();
let languages = getLanguages();
let lastUpdate;
let requestTopics;
let user;

let language = languages.filter(function (obj) {
    return obj.active == true;
})[0];

chrome.alarms.create("feed", {
    delayInMinutes: 0,
    periodInMinutes: 0.3
});

chrome.alarms.onAlarm.addListener(alarms => {
    if (alarms.name == "feed") {
        chrome.storage.sync.get({
            language: language,
            feed: feed,
            lastUpdateFeed: new Date(),
            user: null,
        }, items => {
            init(items);
        });
    }
});

function init(datas) {

    language = datas.language;
    feed = datas.feed;
    lastUpdate = (datas.lastUpdateFeed instanceof Date) ? datas.lastUpdateFeed : new Date(datas.lastUpdateFeed);
    user = datas.user;

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

                    var message = 'Feed RSS failed, please contact the web developer';

                    if (response.status == 500 || response.status == 400) {
                        message = feed.product.name + ' forum (' + language.name + ') doesn\'t exist. RSS feed is disabled';
                        feed.active = false;

                    } else if (response.status == 503) {
                        message = 'Stop spamming. Please, reload in a few seconds';
                    }

                    throw new Error(message);
                } else {
                    return response;
                }

            })

            .catch(error => {
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

            /* Transform to array */

            .then(topic => {
                topic = Array.prototype.slice.call(topic);

                return topic;
            })

            /* Get items */

            .then(topic => {

                function findItem(topic) {
                    return topic.tagName == 'item';
                }

                return topic.filter(findItem).map(function (elem) {
                    return new Topic(elem);
                });
            })

            .then(topics => {

                if (feed.topics.length > 0) {

                    function checkDate(topic) {
                        topic.new = (new Date(topic.date)) > lastUpdate;

                        let index = feed.topics.findIndex(elem => elem.date === topic.date);
                        topic.visited = (index >= 0) ? feed.topics[index].visited : false;

                        return topic;
                    }

                    topics = topics.map(checkDate);

                }

                return topics;
            })

            .then(topics => {

                feed.topics = topics;

                console.log(feed.topics);

                chrome.storage.sync.set({
                    feed: feed
                });

                topics = topics.filter(topic => {
                    return topic.new
                });

                chrome.browserAction.setBadgeText({
                    text: (topics.length > 0) ? topics.length.toString() : ''
                });

            });
    }

};