var UserID = require('../models/models')

// var Rap = require('../models/models')


var apiController = {

	// get : function(req, res) {
	// 	Rap.find({}, function(err, doc) {
	// 		res.send(doc)
	// 	})
	// },

	get : function(req, res) {
		UserID.find({}, function(err, doc) {
			res.send(doc)
		})
	},

	createRap: function(req, res) {
		var newDbRap = new Rap(req.body);
		newDbRap.save(function(err, doc) {
			console.log("this doc" + doc)
			console.log("Rap " + err)
			res.send(doc);
		})
	},

	game: function(req, res) {
		var newUser = new UserID(req.body);
		
		newUser.save(function(err, doc) {
			console.log("UserID Err: " , err)
			console.log("UserID Doc" , doc)
			res.send(doc)
		})
	}
	

}

module.exports = apiController;