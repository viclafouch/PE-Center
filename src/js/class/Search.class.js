let limit = 6; 

class Search {
	constructor(search) {
		this.limit = search.limit;
		this.active = search.active;
		this.save = search.save;
		this.value = search.value;
	}

	setSave(value) {
		this.save = (typeof(value) === "boolean") ? value : true;
	}

	setLimit(value) {
		this.limit = (parseInt(value) && parseInt(value) >= 1 && parseInt(value) <= 10) ? parseInt(value) : limit;
	}
}

export default function getSearch(search = {
	'limit': limit,
	'save': false,
	'value': '',
	'active': true
}) {
 	return new Search(search);
}
