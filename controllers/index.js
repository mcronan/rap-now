var Rap = require('../models/models');

// var data = Rap.find({ rap : ''})

var indexController = {
	index: function(req, res) {
		res.render('index');
		req.query  = {
			uniqueUrl :'500'
		}

	},

	templates: function(req, res) {
		res.render('templates/' + req.params.templateName)
		req.query  = {
			uniqueUrl :'500'
		}
	}
};

module.exports = indexController;