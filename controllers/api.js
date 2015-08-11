var Rap = require('../models/models')

var apiController = {

	get : function(req, res) {
		Rap.find({}, function(err, doc) {
			res.send(doc)
		})
	},

	create : function(req, res) {
		console.log(req.body)
		var newDbRap = new Rap(req.body);
		newDbRap.save(function(err, doc) {
			console.log(err)
			console.log(doc)
			res.send(doc);
		})
	}
}

module.exports = apiController;