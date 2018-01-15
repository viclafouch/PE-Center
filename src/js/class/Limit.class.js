let limit = 6; 

class Limit {
	constructor(limit) {
		this.number = limit;
		this.active = true;
	}
}

export default function getLimit() {
 	return new Limit(6);
}
