/* Use class for traduction. Please DON'T use any library */

class Content {

    constructor(feed) {

        this.anchor = {
            "fr": "Donner votre avis",
            "en": "Give your feedback",
            "de": "Geben Sie Ihre Meinung ab",
            "it": "Dai la tua opinione",
        },

        this.placeholder = {
            "fr": "Votre recherche ici",
            "en": "Your search here",
            "de": "Ihre Suche hier",
            "it": "La tua ricerca qui",
        },

        this.options = {
            "fr": "Options",
            "en": "Options",
            "de": "Einstellungen",
            "it": "Opzioni",
        },

        this.loading = {
            "fr": "Chargement",
            "en": "Loading",
            "de": "Wird geladen",
            "it": "In caricamento",
        },

        this.copy = {
            "fr": "Copier",
            "en": "Copy",
            "de": "Kopieren",
            "it": "Copia",
        },

        this.location = {
            "fr": "Redirection",
            "en": "Redirection",
            "de": "Umleitung",
            "it": "Reindirizzamento",
        }

        this.title = (feed.content == 'msgs') ? {
            "fr": "Derniers messages du forum "+ feed.product,
            "en": "Last messages from "+feed.product+" forum", 
            "de": "Die letzten Nachrichten vom "+feed.product+" forum",
            "it": "Gli ultimi messaggi del forum di "+ feed.product,
        } : {
            "fr": "Derniers topic du forum "+ feed.product,
            "en": "Last topics from "+feed.product+" forum", 
            "de": "Die letzten Themen vom "+feed.product+" forum", 
            "it": "Gli ultimi argomenti sul forum di "+ feed.product,
        }
    }
}

export default function getContent(feed) {
    return new Content(feed);
}