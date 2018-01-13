const contentsAvailable = ['msgs', 'topics'];
const productsAvailable = [
	'YouTube', 
	'Chrome', 
	'Gmail', 
	'AdSense', 
	'Maps', 
	'Photos', 
	'WebSearch', 
	'Calendar', 
	'Webmaster'
];

class Feed {

	constructor(feed) {
		this.id = 'feed';
		this.product = feed.product;
		this.active = feed.active;
		this.content = feed.content;
	}

	setProduct(value) {
		this.product = (productsAvailable.includes(value)) ? value : productsAvailable[1];
	}

	setActive(value) {
		this.active = (typeof(value) === "boolean") ? value : true;
	}

	setContent(value) {
		this.content = (contentsAvailable.includes(value)) ? value : contentsAvailable[0];
	}
}


export default function getFeed(feed = {
	'active': true,
	'product': productsAvailable[1],
	'content': contentsAvailable[0],
}) {
 	return new Feed(feed);
}