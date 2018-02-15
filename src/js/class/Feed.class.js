const contentsAvailable = ['msgs', 'topics'];
export const productsAvailable = [
	{
		'name': 'YouTube',
		'id': 0,
		'param': 'youtube',
		'img': 'youtube'
	},
	{
		'name': 'Chrome',
		'id': 1,
		'param': 'chrome',
		'img': 'chrome'
	},
	{
		'name': 'Gmail',
		'id': 2,
		'param': 'gmail',
		'img': 'gmail'
	},
	{
		'name': 'AdSense',
		'id': 3,
		'param': 'adsense',
		'img': 'adsense'
	},
	{
		'name': 'Maps',
		'id': 4,
		'param': 'maps',
		'img': 'maps'
	},
	{
		'name': 'Photos',
		'id': 5,
		'param': 'photos',
		'img': 'photos'
	},
	{
		'name': 'Websearch',
		'id': 6,
		'param': 'websearch',
		'img': 'websearch'
	},
	{
		'name': 'Calendar',
		'id': 7,
		'param': 'calendar',
		'img': 'calendar'
	},
	{
		'name': 'Webmaster',
		'id': 8,
		'param': 'webmaster',
		'img': 'search-console'
	},
	{
		'name': 'Chromebook',
		'id': 9,
		'param': 'chromebook-central',
		'img': 'chromebook'
	},
	{
		'name': 'G Suite Administrator',
		'id': 10,
		'param': 'apps',
		'img': 'g-suite'
	},
	{
		'name': 'Google Play',
		'id': 11,
		'param': 'play',
		'img': 'google-play'
	},
	{
		'name': 'Google Home',
		'id': 12,
		'param': 'googlehome',
		'img': 'google-home'
	},
	{
		'name': 'Google Wifi',
		'id': 13,
		'param': 'googlewifi',
		'img': 'google-wifi'
	},
];

class Feed {

	constructor(feed) {
		this.id = 'feed';
		this.product = feed.product;
		this.active = feed.active;
		this.notification = feed.notification;
		this.content = feed.content;
		this.topics = feed.topics || [];
		this.status = feed.status || 200;
	}

	setProduct(value) {
		this.product = productsAvailable.find(item => item.id === parseInt(value));
	}

	setActive(value) {
		this.active = (typeof(value) === "boolean") ? value : true;
	}

	setNotification(value) {
		this.notification = (typeof (value) === "boolean") ? value : true;
	}

	setContent(value) {
		this.content = (contentsAvailable.includes(value)) ? value : contentsAvailable[0];
	}
}


export function getFeed(feed = {
	'active': true,
	'notification': true,
	'product': productsAvailable[0],
	'content': contentsAvailable[0],
}) {
 	return new Feed(feed);
}