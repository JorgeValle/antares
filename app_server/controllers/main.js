/* GET home page */
module.exports.index = function(req, res) {
	res.render('/themes/views/index', { 
		documentTitle: 'Home | JorgeValle.com'

	});
};