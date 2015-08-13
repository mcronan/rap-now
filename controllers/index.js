var Rap = require('../models/models');

//  get random numbers 
function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}
var randomNo = getRandom(1, 100000);

var indexController = {
	index: function(req, res) {
		// pass in randomiser object in our route
		res.render('index', {uniqueID : randomNo});
	},

	templates: function(req, res) {
		res.render('templates/' + req.params.templateName)
	}
};

module.exports = indexController;