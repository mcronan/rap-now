// var UserID = require('../models/models')

var Rap = require('../models/models')


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
			console.log("this Rap " + doc)
			console.log("Rap err" + err)
			res.send(doc);
		})
	},

	game: function(req, res) {
		UserID.findOne({userID : req.body.userID}, function(err, game) {
			if(game) {
				console.log("game" + game)
				res.send(game)
				// and then render a view
			} else { 
			var newUser = new UserID(req.body);
			console.log("gameController", req.body)
				newUser.save(function(err, doc) {
					res.send(doc)
					})
				}
		})
	}
}

module.exports = apiController;