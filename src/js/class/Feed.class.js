const contentsAvailable = ['msgs', 'topics'];
export const productsAvailable = [
	{
		'name': 'YouTube',
		'id': 0,
		'param': 'youtube'
	},
	{
		'name': 'Chrome',
		'id': 1,
		'param': 'chrome'
	},
	{
		'name': 'Gmail',
		'id': 2,
		'param': 'gmail'
	},
	{
		'name': 'AdSense',
		'id': 3,
		'param': 'adsense'
	},
	{
		'name': 'Maps',
		'id': 4,
		'param': 'maps'
	},
	{
		'name': 'Photos',
		'id': 5,
		'param': 'photos'
	},
	{
		'name': 'Websearch',
		'id': 6,
		'param': 'websearch'
	},
	{
		'name': 'Calendar',
		'id': 7,
		'param': 'calendar'
	},
	{
		'name': 'Webmaster',
		'id': 8,
		'param': 'webmaster'
	},
	{
		'name': 'Chromebook',
		'id': 9,
		'param': 'chromebook-central'
	},
	{
		'name': 'G Suite Administrator',
		'id': 10,
		'param': 'apps'
	},
];

class Feed {

	constructor(feed) {
		this.id = 'feed';
		this.product = feed.product;
		this.active = feed.active;
		this.content = feed.content;
	}

	setProduct(value) {
		this.product = productsAvailable.find(item => item.id === parseInt(value));
	}

	setActive(value) {
		this.active = (typeof(value) === "boolean") ? value : true;
	}

	setContent(value) {
		this.content = (contentsAvailable.includes(value)) ? value : contentsAvailable[0];
	}
}


export function getFeed(feed = {
	'active': true,
	'product': productsAvailable[0],
	'content': contentsAvailable[0],
}) {
 	return new Feed(feed);
}