var Models = require('../models/models')

var apiController = {

	get : function(req, res) {
		Models.UserID.find({}, function(err, doc) {
			res.send(doc)
		})
	},

	// game = userID

	// this needs to do:
	// if url is already there, compare it to the rap
	// that it is associated with and send it back
	game: function(req, res) {
		var rapCreator = [];
		Models.UserID.findOne({userID : req.body.userID}, function(err, game) {
			if(game) {
				console.log("url here ", game)
					Models.Rap.findOne({creator : req.body.userID}, function(err, x) {
						console.log("rapCreator", x)
						rapCreator.push(x)
				})
				res.send(rapCreator)	
			} 
			else { 
				console.log("url not here", game)
			var newUser = new Models.UserID(req.body);
			console.log("gameController", req.body)
			// must not be in correct format to save to db
				newUser.save(function(err, doc) {
					console.log("userID err ", err)
					// this user ID doc works
					console.log("userID doc ", doc)
					res.send(doc)
				})
			
			}
		})
	},

	createRap: function(req, res) {
		Models.Rap.findOne({creator : req.body.creator}, function(err, game) {
			if(game) {
				console.log("creator is there", game)
			} else {
			console.log("creator not there")
			var newDbRap = new Models.Rap(req.body)
			newDbRap.save(function(err, doc) {
	
			console.log("this Rap", doc)
			console.log("Rap err ", err)
			res.send(doc);	

				})
			}
		}

		Populate - break out into new controller?
		Models.Rap.find({}).populate('creator').exec(function(err,doc) {
				console.log("populate : ", doc)
		// 		})
		})
	
}

	// receives a get request from a controller with $routeParams.uniqueID
	userRoute: function(req, res) {
		// checks UserID to see if it has userID corresponding to url
		Models.UserID.findOne({ userID : req.query.userID}, function(err, doc) {
			console.log("userID", doc)
			res.send(doc)
		})

	}
module.exports = apiController;