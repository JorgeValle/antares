var request = require("request");
var apiOptions = {
	server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'http://murmuring-earth-39282.herokuapp.com';
}

var requestOptions = {
	url: apiOptions.server,
	method: 'GET',
	json: {}
};

var prettyDate = function(dateString) {

	var date = new Date(dateString);
	var d = date.getDate(dateString);
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    return m+' '+d+', '+y;

}

var renderPageByTitle = function(req, res, responseBody) {
	res.render('page', {

		// we parse JSON response to get properties ready for consumption in pug templates
		documentTitle: JSON.parse(responseBody).title + " | JorgeValle.com" ,
		canonicalUrl: 'http://jorgevalle.com' + req.url,
		activeUrl: req.url,
		title: JSON.parse(responseBody).title,
		alternativeTitle: JSON.parse(responseBody).alternativeTitle,
		date: prettyDate(JSON.parse(responseBody).publishedDate),
		lastModifiedDate: prettyDate(JSON.parse(responseBody).lastModifiedDate),
		body: JSON.parse(responseBody).body
	});
};


request(requestOptions, function(err, response, body) {
	if(err) {
		console.log(err);
	} else if (response.statusCode === 200) {
		console.log(body);
	} else {
		console.log(response.statusCode);
	}
});

/* GET page by url */
module.exports.pageByUrl = function(req, res) {

	var requestOptions, path;
	path = '/api/pages/' + req.params.pageUrl;

	var fullUrl = apiOptions.server + path;

	requestOptions = {
		url: fullUrl,
		method: 'GET'
	};
	request(requestOptions, function(err, response, body) {

			if (err) {
				console.log("Request error" + err);
			} else {
				renderPageByTitle(req, res, body);
			}

	});
};

/* GET page by url */
module.exports.thanks = function(req, res) {

	res.render('thanks', {

		// we parse JSON response to get properties ready for consumption in pug templates
		documentTitle: " Thanks | JorgeValle.com" ,
		canonicalUrl: 'http://jorgevalle.com' + req.url,
		activeUrl: req.url
	});
};