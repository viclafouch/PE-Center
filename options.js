const languagesDOM = document.querySelectorAll('[data-type="language"]');
const productsDOM = document.querySelectorAll('[data-type="product"]');
const formLimit = document.getElementById('limitForm');
const formFeed = document.getElementById('formFeed');

let languages = ['fr', 'en'];
let products = ['YouTube', 'Chrome'];

let productsChoosed = [];
let languageChoosed = '';

let defaultLanguage = 'fr';
let defaultProducts = products;
let defaultLimit = 6;
let defaultFeed = {
    "show": true,
    "content": 'msgs',
    "product": 'Chrome'
}

var nodeToArray = node => {
    return [].slice.call(node);
}

function verifActive(element, multiple = true) {

    if (multiple) {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        } else {
            element.classList.add('active');
        }
    } else {
        languagesDOM.forEach( function(element, index) {
            element.classList.remove('active');
        });

        element.classList.add('active');
    }

    return nodeToArray(document.querySelectorAll('[data-type="'+element.getAttribute('data-type')+'"].active'));
}

function insertMessage(options) {

    let status = document.querySelector('[data-message="'+options.type+'"]');

    if (options.datas.length > 0) {
        var i = document.createElement('i');
        i.textContent = '"'+options.datas.join(', ')+'"';

        var space = document.createTextNode("\u00A0");

        var span = document.createElement('span');
        span.textContent = " is selected";
        if (options.datas.length > 1) {
            span.textContent = " are selected";
        } else if (options.type == 'limit') {
            span.textContent = " result(s) will be display at most";
        }

        status.appendChild(i);
        status.appendChild(space);
        status.appendChild(span);

    } else if (options.type == 'feed') {
        var span = document.createElement('span');
        let w = (options.datas.show) ? 'will be' : 'will not be';
        span.textContent = 'Last '+options.datas.content+' from '+options.datas.product+' forum '+w+' display';
        status.appendChild(span);
        return false;
    } else {
       status.textContent = 'No '+options.type+' selected'; 
    }
}

function successDOM(options, timeOut = 750) {
    if (typeof options === 'object') {
        var status = document.querySelector('[data-message="'+options.type+'"]');
        status.classList.add('active');
        status.textContent = 'Options saved.';

        setTimeout(function() {
            while (status.firstChild) {
                status.removeChild(status.firstChild);
            }
            status.classList.remove('active');

            insertMessage(options);
        }, timeOut);
    }
}

productsDOM.forEach(function(element, index) {
    element.addEventListener('click', function(e) {

        e.preventDefault();

        let product = this.getAttribute('data-name');
        let productsActive = verifActive(this);

        function verifProduct(product) {
            return products.includes(product.getAttribute('data-name'));
        }

        function getProduct(product) {
            return product.getAttribute('data-name');
        }

        productsChoosed = productsActive.filter(verifProduct).map(getProduct);

        chrome.storage.sync.set({
            favoriteProducts: (productsChoosed.length > 0) ? productsChoosed : defaultProducts
        }, successDOM ({
            "datas": productsChoosed,
            "type": 'products'
        }));

    }, false);

    tabEnter(element);
});

function tabEnter(element) {
    element.addEventListener('focusin', function(e){
        element.onkeydown = function(e) {
            if (e.keyCode == 13) {
                element.click();
            }
        };
    }, false);
}

languagesDOM.forEach(function(element, index) {
    element.addEventListener('click', function(e) {

        e.preventDefault();

        let language = this.getAttribute('data-language');

        let languageActive = verifActive(this, false);

        function verifLanguage(language) {
            return languages.includes(language.getAttribute('data-name'));
        }

        function getLanguage(language) {
            return language.getAttribute('data-name');
        }

        languageChoosed = languageActive.filter(verifLanguage).map(getLanguage);

        chrome.storage.sync.set({
            favoriteLanguage: (languageChoosed.length == 1) ? languageChoosed.join() : 'en'
        }, successDOM ({
            "datas": languageChoosed,
            "type": 'language'
        }));

    }, false);

    tabEnter(element);
});

formLimit.addEventListener('submit', function(e) {
    e.preventDefault();

    let inputLimit = document.getElementById('limit');
    let value = inputLimit.value;

    if (value = parseInt(value)) {
        if (value >= 1 && value <= 10) {
            chrome.storage.sync.set({
                favoriteLimit: value
            }, successDOM ({
                "datas": [value],
                "type": 'limit'
            }));
        }
    }
    return false;
}, false);

formFeed.addEventListener('submit', function(e) {
    e.preventDefault();

    const contentsAvailable = ['msgs', 'topics'];
    const productsAvailable = ['YouTube', 'Chrome', 'Gmail', 'AdSense', 'Maps', 'Photos', 'WebSearch', 'Calendar', 'Webmaster'];

    let show = document.getElementById('showFeed').checked;
    let content = contentsAvailable.includes(document.getElementById('contentFeed').value) ? document.getElementById('contentFeed').value : false;
    let product = productsAvailable.includes(document.getElementById('productFeed').value) ? document.getElementById('productFeed').value : false;

    if (typeof(show) === "boolean" && content && product) {

        let feed = {
            "show": show,
            "content": content,
            "product": product
        }

        chrome.storage.sync.set({
            feed: feed
        }, successDOM ({
            "datas": feed,
            "type": 'feed'
        }));
    }

}, false);

function restore_options() {
    chrome.storage.sync.get({
        favoriteLanguage: defaultLanguage,
        favoriteProducts: defaultProducts,
        favoriteLimit: defaultLimit,
        feed: defaultFeed
    }, function(items) {

        let elements = nodeToArray(languagesDOM).concat(nodeToArray(productsDOM));

        let datas = items.favoriteProducts.concat([items.favoriteLanguage]);

        for (var i = elements.length - 1; i >= 0; i--) {
            if (datas.includes(elements[i].getAttribute('data-name'))) {
                elements[i].classList.add('active');
            }
        }

        document.querySelectorAll('.message').forEach( function(element, index) {

            if (element.getAttribute('data-message') == 'products') {
                var options = {
                    "datas": items.favoriteProducts,
                    "type": 'products'
                };
            } else if (element.getAttribute('data-message') == 'language') {
                var options = {
                    "datas": [items.favoriteLanguage],
                    "type": 'language'
                };
            } else if (element.getAttribute('data-message') == 'limit') {
                var options = {
                    "datas": [items.favoriteLimit],
                    "type": 'limit'
                };
            } else if (element.getAttribute('data-message') == 'feed') {
                var options = {
                    "datas": items.feed,
                    "type": 'feed'
                };
            }

            if (options) {
                insertMessage(options);
            }
        });

        document.getElementById('limit').value = items.favoriteLimit;
        if (items.feed.show) { document.getElementById('showFeed').setAttribute('checked', 'checked'); }
        document.getElementById('contentFeed').value = items.feed.content;
        document.getElementById('productFeed').value = items.feed.product;
        tabEnter(document.getElementById('toggleLabel'));
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

Bubblesee.bind('[data-type][title]', 'skew');
Bubblesee.bind('a.star i[title]', 'rotate');