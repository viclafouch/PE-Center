const _languages = [
	{
		'iso': 'fr',
		'flag': 'fr',
		'name': 'French',
		'active': false
	},

	{
		'iso': 'en',
		'flag': 'gb',
		'name': 'English',
		'active': true
	},

	{
		'iso': 'de',
		'flag': 'de',
		'name': 'German',
		'active': false
	},

	{
		'iso': 'it',
		'flag': 'it',
		'name': 'Italian',
		'active': false
	},

	{
		'iso': 'ru',
		'flag': 'ru',
		'name': 'Russian',
		'active': false
	},

	{
		'iso': 'es',
		'flag': 'es',
		'name': 'Spanish',
		'active': false
	},

	{
		'iso': 'pt',
		'flag': 'pt',
		'name': 'Portuguese',
		'active': false
	},

]

class Language {

	constructor(language) {
		this.id = 'language';
		this.iso = language.iso;
		this.flag = language.flag;
		this.name = language.name;
        this.node = this.setNode();
        this.active = language.active;
        this.messageNode = document.querySelector('[data-message="language"]');
	}

	setNode() {
		let li = document.createElement('li');
        li.classList.add('language');

        let span = document.createElement('span');
        span.setAttribute('data-type', 'language');
        span.setAttribute('tabindex', 0);
        span.setAttribute('data-name', this.iso);
        span.setAttribute('title', this.name);

        span.classList.add('flag-icon');
        span.classList.add('flag-icon-'+this.flag);

        li.appendChild(span);

        return li;
	}

}


export default function getLanguages() {
 	return _languages.map(function(elem) {
 		return new Language(elem);
 	});
}

