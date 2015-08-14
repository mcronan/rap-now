var Models = require('../models/models')

var apiController = {

	get : function(req, res) {
		Models.UserID.find({}, function(err, doc) {
			res.send(doc)
		})
	},

	
	game: function(req, res) {

	// 	Models.UserID.find({}).populate('userRap').exec(function(err,doc) {
	// 		res.send(doc)
	// 	})

	// }
		Models.UserID.findOne({userID : req.body.userID}, function(err, game) {
			if(game) {
				console.log("game ", game)
				res.send(game)
				// and then render a view
			} else { 
			var newUser = new Models.UserID(req.body);
			console.log("gameController", req.body)
				newUser.save(function(err, doc) {
					console.log("userID err ", err)
					console.log("userID doc ", doc)
					res.send(doc)
				})
			}
		})
	},

	createRap: function(req, res) {
		var newDbRap = new Models.Rap(req.body)
		newDbRap.save(function(err, doc) {
	
			console.log("this Rap", doc)
			console.log("Rap err ", err)
			res.send(doc);	
		})

		// break out into new controller?
		Models.Rap.find({}).populate('creator').exec(function(err,doc) {
				console.log("populate : ", doc)
				})
	},


	// receives a get request from a controller with $routeParams.uniqueID
	userRoute: function(req, res) {
		// checks UserID to see if it has userID corresponding to url
		Models.UserID.findOne({ userID : {in : req.query.userID}}, function(err, doc) {
			res.send(doc)
		})

	}
}
module.exports = apiController;