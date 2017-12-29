var flags = document.querySelectorAll('.flag');
var services = document.querySelectorAll('.product img');

var languages = ['fr', 'en'];
var products = ['YouTube', 'Chrome'];

services.forEach(function(element, index) {
    element.addEventListener('click', function(e) {
        e.preventDefault();

        var parent = this.parentElement;
        var product = parent.getAttribute('data-name');

        let favoritesProducts = [];

        if (parent.classList.contains('active')) {
            parent.classList.remove('active');
        } else {
            parent.classList.add('active');
        }

        document.querySelectorAll('.product.active').forEach( function(element, index) {

            let name = element.getAttribute('data-name');

            if (!products.includes(name)) {
                return false;
            } else {
                favoritesProducts.push(name);
            }
        });
        console.log(favoritesProducts);
        chrome.storage.sync.set({
            favoriteProducts: favoritesProducts
        }, function() {

            console.log('test');

            var status = document.getElementById('status_pd');
            status.classList.add('active');
            status.textContent = 'Options saved.';

            setTimeout(function() {
                status.innerHTML = '';
                status.classList.remove('active');
                if (favoritesProducts.length > 0) {
                    var i = document.createElement('i');
                    var foo = document.createTextNode("\u00A0");
                    i.textContent = '"'+favoritesProducts.join(', ')+'"';
                    var t = document.createElement('span');
                    t.textContent = " is selected";
                    if (favoritesProducts.length > 1) {
                        t.textContent = " are selected";
                    }
                    status.appendChild(i);
                    status.appendChild(foo);
                    status.appendChild(t);
                } else {
                    status.textContent = 'No product selected';
                }
            }, 1100);
        });

    }, false);
});

flags.forEach(function(element, index) {
    element.addEventListener('click', function(e) {

        e.preventDefault();

        var language = this.getAttribute('id');

        if (!languages.includes(language)) {
            return false;
        }

        flags.forEach( function(element, index) {
            element.classList.remove('active');
        });

        chrome.storage.sync.set({
            favoriteLanguage: language
        }, function() {
            element.classList.add('active');
            var status = document.getElementById('status_lg');
            status.classList.add('active');
            status.textContent = 'Options saved.';

            setTimeout(function() {
                status.innerHTML = '';
                status.classList.remove('active');
                var i = document.createElement('i');
                var foo = document.createTextNode("\u00A0");
                i.textContent = '"'+language+'"';
                var t = document.createElement('span');
                t.textContent = " is selected";
                status.appendChild(i);
                status.appendChild(foo);
                status.appendChild(t);
            }, 1100);
        });

    }, false);
});




function restore_options() {
    chrome.storage.sync.get({
        favoriteLanguage: 'fr',
        favoriteProducts: ['YouTube', 'Chrome']
    }, function(items) {
        document.getElementById(items.favoriteLanguage).classList.add('active');
        var status = document.getElementById('status_lg');

        var i = document.createElement('i');
        var foo = document.createTextNode("\u00A0");
        i.textContent = '"'+items.favoriteLanguage+'"';
        var t = document.createElement('span');
        t.textContent = " is selected";
        status.appendChild(i);
        status.appendChild(foo);
        status.appendChild(t);

        status = document.getElementById('status_pd');

        console.log(items);

         if (items.favoriteProducts.length > 0) {
            var i = document.createElement('i');
            var foo = document.createTextNode("\u00A0");
            i.textContent = '"'+items.favoriteProducts.join(', ')+'"';
            var t = document.createElement('span');
            t.textContent = " is selected";
            if (items.favoriteProducts.length > 1) {
                t.textContent = " are selected";
            }
            status.appendChild(i);
            status.appendChild(foo);
            status.appendChild(t);
        } else {
            status.textContent = 'No product selected';
        }

        document.querySelectorAll('.product').forEach( function(element, index) {
            let name = element.getAttribute('data-name');

            if (items.favoriteProducts.includes(name)) {
                element.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

Bubblesee.bind('span.flag[title]', 'skew');
Bubblesee.bind('a.star i[title]', 'rotate');
Bubblesee.bind('li.product img[title]', 'skew');