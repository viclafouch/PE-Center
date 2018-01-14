const _languages = [
	{
		'iso': 'fr',
		'flag': 'fr',
		'name': 'Francais',
		'active': true
	},

	{
		'iso': 'en',
		'flag': 'gb',
		'name': 'English',
		'active': false
	},

	{
		'iso': 'de',
		'flag': 'de',
		'name': 'Deutch',
		'active': false
	},

	{
		'iso': 'it',
		'flag': 'it',
		'name': 'Italian',
		'active': false
	}
	
]

class Language {

	constructor(language) {
		this.id = 'language';
		this.iso = language.iso;
		this.flag = language.flag;
		this.name = language.name;

		let li = document.createElement('li');
        li.classList.add('language');

        let span = document.createElement('span');
        span.setAttribute('data-type', 'language');
        span.setAttribute('tabindex', 0);
        span.setAttribute('data-name', language.iso);
        span.setAttribute('title', language.name);

        span.classList.add('flag-icon');
        span.classList.add('flag-icon-'+language.flag);

        li.appendChild(span);

        this.node = li;
        this.active = language.active;
        this.messageNode = document.querySelector('[data-message="language"]');
	}

}


export default function getLanguages() {
 	return _languages.map(function(elem) {
 		return new Language(elem);
 	});
}

