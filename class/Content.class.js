/* Use class for traduction. Please DON'T use any library */

class Content {

    constructor(feed) {

        this.anchor = {
            "fr": "Site web",
            "en": "Website",
            "de": "Webseite"
        },

        this.placeholder = {
            "fr": "Votre recherche ici",
            "en": "Your search here",
            "de": "de"
        },

        this.loading = {
            "fr": "Chargement",
            "en": "Loading",
            "de": "Laden"
        },

        this.copy = {
            "fr": "Copier",
            "en": "Copy",
            "de": "Kopie"
        },

        this.location = {
            "fr": "Redirection",
            "en": "Redirection",
            "de": "Umleitung"
        }

        this.title = (feed.content == 'msgs') ? {
            "fr": "Derniers messages du forum "+ feed.product,
            "en": "Last messages from "+feed.product+" forum", 
            "de": "Last looodl form"
        } : {
            "fr": "Derniers topic du forum "+ feed.product,
            "en": "Last topics from "+feed.product+" forum", 
            "de": "Last looodl form"
        }
    }
}

export default function getContent(feed) {
    return new Content(feed);
}