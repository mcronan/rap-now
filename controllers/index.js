var Rap = require('../models/models');
var UserID = require('../models/models');

//  get random numbers 
function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}
	
var randomNo = getRandom(1, 100000);

var indexController = {
	// 'next' middleare for the second rapper
	index: function(req, res, next) {
		// pass in randomiser object in our route
		// if((window.location.hash='#{uniqueID}') === (window.location.hash='#{uniqueID}')) {
		// 	next()
		// } else { 
		res.render('index', {uniqueID : randomNo}); 

		// }
		// res.redirect('templates/secondrap');
	},

	templates: function(req, res) {
		res.render('templates/' + req.params.templateName)
	}
};

module.exports = indexController;