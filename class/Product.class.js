const _products = [
	{
		'name': 'YouTube',
		'image': {
			'ext': 'png',
			'name': 'youtube'
		},
		'active': true,
	},
	{
		'name': 'Chrome',
		'image': {
			'ext': 'png',
			'name': 'chrome'
		},
		'active': true
	},
]

class Product {

	constructor(product) {
		this.id = 'product';
		this.name = product.name;
		this.image = {
			'name': product.image.name,
			'ext': product.image.ext
		}

		this.active = product.active;

		let li = document.createElement('li');
        li.classList.add('product');

        let img = document.createElement('img');
        img.setAttribute('data-type', 'product');
        img.setAttribute('tabindex', 0);
        img.setAttribute('data-name', product.name);
        img.src = product.image.name+'.'+product.image.ext;
        img.setAttribute('title', product.name);

        li.appendChild(img);

       	this.node = li;
       	this.messageNode = document.querySelector('[data-message="products"]');
	}


}

export default function getProducts() {
 	return _products.map(function(elem) {
 		return new Product(elem);
 	});
}