let path = 'src/products/64';

/* Card Object */

export default class Card {

    constructor(data, product) {

        this.title = {
            'fr': data.fiche_title_fr,
            'en': data.fiche_title_en,
            'de': data.fiche_title_de,
            'it': data.fiche_title_it,
            'ru': data.fiche_title_ru,
            'es': data.fiche_title_es,
            'pt': data.fiche_title_pt,
            'default' : null
        };

        this.product = {
            'name': data.product_name,
            'id': parseInt(data.fiche_product),
        };

        this.date = data.fiche_date_creat;

        this.position = null;

        this.url = data.fiche_url;

        this.id = Math.floor(Math.random() * (1000000000 - 1 + 1)) + 1;

        this.category = data.cat_name;

        this.img = null;

        this.node = null;

        this.visible = false;

        this.active = false;
    }

    setNode() {
        let article = document.createElement('article');
        article.classList.add('TC_center_article_result');
        article.classList.add('card');
        article.classList.add('hidden');

        let img = document.createElement('img');
        img.src = path+'/'+this.img;
        img.setAttribute('alt', this.title.default);

        var p = document.createElement('p');
        p.textContent = this.title.default;

        article.setAttribute('data-href', this.url);
        article.setAttribute('data-title', this.title.default);

        article.appendChild(img);
        article.appendChild(p);

        this.node = article;

        return article;
    }

    setVisible() {
        this.node.classList.add('visible');
        this.node.classList.remove('hidden');
        this.visible = true;
        return this;
    }

    setHidden() {
        this.node.classList.remove('visible');
        this.node.classList.add('hidden');
        this.visible = false;
    }

    setActive() {
        if (this.active) {
            this.setNoActive();
        } else {
            this.active = true;
            this.node.classList.add('active');
        }
    }

    setNoActive() {
        this.active = false;
        this.node.classList.remove('active');
    }

    copy() {
        var storage = document.createElement('div');
        storage.setAttribute("contentEditable", true);

        var core = document.createElement('a');
        core.textContent = this.title.default;
        core.setAttribute('href', this.url);

        storage.appendChild(core);
        storage.style.position = "fixed";
        document.getElementById('storageCopy').appendChild(storage);
        storage.focus();
        document.execCommand('SelectAll');
        var successful = document.execCommand("Copy", false, null);
        storage.remove();
    }

    redirection() {
        chrome.tabs.create({
            active: true,
            url: this.url,
            pinned: false
        });
    }
}