/* Use class for traduction. Please DON'T use any library */

class Content {

    constructor(feed) {

        this.anchor = {
            "fr": "Donner votre avis",
            "en": "Give your feedback",
            "de": "Geben Sie Ihre Meinung ab",
            "it": "Dai la tua opinione",
            "ru": "Поделитесь своим мнением",
            "pt": "Dê o seu feedback",
            "es": "Comparte tu opinión",
        },

        this.placeholder = {
            "fr": "Votre recherche ici",
            "en": "Your search here",
            "de": "Ihre Suche hier",
            "it": "La tua ricerca qui",
            "ru": "Ваш поиск здесь",
            "pt": "Sua busca aqui",
            "es": "Tu búsqueda aquí",
        },

        this.options = {
            "fr": "Options",
            "en": "Options",
            "de": "Einstellungen",
            "it": "Opzioni",
            "ru": "Варианты",
            "pt": "Opções",
            "es": "Opciones",
        },

        this.loading = {
            "fr": "Chargement",
            "en": "Loading",
            "de": "Wird geladen",
            "it": "In caricamento",
            "ru": "загрузка",
            "pt": "Carregando",
            "es": "Cargando",
        },

        this.copy = {
            "fr": "Copier",
            "en": "Copy",
            "de": "Kopieren",
            "it": "Copia",
            "ru": "Скопировать",
            "pt": "Copiar",
            "es": "Copiar",
        },

        this.location = {
            "fr": "Redirection",
            "en": "Redirection",
            "de": "Umleitung",
            "it": "Reindirizzamento",
            "ru": "Перенаправляем",
            "pt": "Redirecionar",
            "es": "Redirección",
        }

        this.title = (feed.content == 'msgs') ? {
            "fr": "Derniers messages du forum "+ feed.product.name,
            "en": "Last messages from "+feed.product.name+" forum", 
            "de": "Die letzten Nachrichten vom "+feed.product.name+" forum",
            "it": "Gli ultimi messaggi del forum di "+ feed.product.name,
            "ru": "Последние сообщения на форуме "+ feed.product.name,
            "pt": "Últimas mensagens do fórum do "+ feed.product.name,
            "es": "Últimos mensajes del foro de "+ feed.product.name,
        } : {
            "fr": "Derniers topic du forum "+ feed.product.name,
            "en": "Last topics from "+feed.product.name+" forum", 
            "de": "Die letzten Themen vom "+feed.product.name+" forum", 
            "it": "Gli ultimi argomenti sul forum di "+ feed.product.name,
            "ru": "Последние темы на форуме "+ feed.product.name,
            "pt": "Últimos tópicos do fórum do "+ feed.product.name,
            "es": "Últimos hilos del foro de "+ feed.product.name,
        }
    }
}

export default function getContent(feed) {
    return new Content(feed);
}