let path = 'src/products/64';

const _products = [
	{
		'id': 1,
		'name': 'YouTube',
		'image': {
			'ext': 'png',
			'name': 'youtube'
		},
		'active': true,
	},
	{
		'id': 2,
		'name': 'Chrome',
		'image': {
			'ext': 'png',
			'name': 'chrome'
		},
		'active': true
	},
	{
		'id': 3,
		'name': 'Gmail',
		'image': {
			'ext': 'png',
			'name': 'gmail'
		},
		'active': false
	},
	{
		'id': 4,
		'name': 'Google Chromebook',
		'image': {
			'ext': 'png',
			'name': 'chromebook'
		},
		'active': false
	},
	{
		'id': 5,
		'name': 'Google Calendar',
		'image': {
			'ext': 'png',
			'name': 'calendar'
		},
		'active': false
	},
	{
		'id': 6,
		'name': 'G Suite Administrator',
		'image': {
			'ext': 'png',
			'name': 'g-suite'
		},
		'active': false
	},
	{
		'id': 7,
		'name': 'Search Console',
		'image': {
			'ext': 'png',
			'name': 'search-console'
		},
		'active': false
	},
	{
		'id': 8,
		'name': 'Google Home',
		'image': {
			'ext': 'png',
			'name': 'googlehome'
		},
		'active': false
	},
	{
		'id': 8,
		'name': 'Chromecast',
		'image': {
			'ext': 'png',
			'name': 'chromecast'
		},
		'active': false
	},
	{
		'id': 9,
		'name': 'Google Play',
		'image': {
			'ext': 'png',
			'name': 'googleplay'
		},
		'active': false
	},


]

class Product {

	constructor(product) {
		this.id = product.id;
		this.name = product.name;
		this.image = {
			'name': product.image.name,
			'ext': product.image.ext
		}

		this.active = product.active;

       	this.node = this.setNode();
       	this.messageNode = document.querySelector('[data-message="products"]');
	}

	setNode() {
		let li = document.createElement('li');
        li.classList.add('product');

        let img = document.createElement('img');
        img.setAttribute('data-type', 'product');
        img.setAttribute('tabindex', 0);
        img.setAttribute('data-name', this.name);
        img.src = path+'/'+this.image.name+'.'+this.image.ext;
        img.setAttribute('title', this.name);

        li.appendChild(img);

        return li;
	}


}

export default function getProducts() {
 	return _products.map(function(elem) {
 		return new Product(elem);
 	});
}