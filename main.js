let anchor = document.getElementById('website-anchor');
let searchInput = document.getElementById('input-search');
let datas = [];

var request = new Request('filename.json');

fetch(request)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
    	datas.push(data[i]);
    }
  });

console.log(anchor);

anchor.addEventListener('click', function(e) {
	var location = this.getAttribute('href');
	chrome.tabs.create({
		active: true, 
		url: location,
		pinned: false
	});
}, false);

searchInput.addEventListener('keyup', function(e) {
	console.log(datas);
}, false);

