var Rap = require('../models/models');

// var data = Rap.find({ rap : ''})

var indexController = {
	index: function(req, res) {
		res.render('index');
	},

	templates: function(req, res) {
		res.render('templates/' + req.params.templateName)
		console.log("data : " + data)
	}
};

module.exports = indexController;