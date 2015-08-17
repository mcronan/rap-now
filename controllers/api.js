var Models = require('../models/models')

var apiController = {

	get : function(req, res) {
		Models.Rap.find({}, function(err, doc) {
			res.send(doc)
		})
	},

	getUsers : function(req, res) {
		Models.UserID.find({}, function(err, doc) {
			res.send(doc)
		})
	},

// ***************************** Url Route *****************************

	rapUrl: function(req, res)  {
		console.log("hello", req.body)
		Models.Rap.findOne({creator : req.body.userID}, function(err, rap) {
				if(rap) {
					res.send(rap)
					console.log(rap)
				}
				else {
					var newDbRap = new Models.Rap({
						creator: req.body.userID,
						rap: 	[]
						})
					newDbRap.save(function(err, doc) {
					res.send(doc);	
			})
		}
	})
},

// ***************************** Rap Route *****************************
	
	rapUpdate: function(req, res) {
		// var newDbRap = new Models.Rap({
		// 	creator: req.body.creator,
		// 	raps : req.body.rap
		// })
		// newDbRap.save(function(err, doc) {
		// 	res.send(doc)
		// })

		Models.Rap.findOneAndUpdate({creator: req.body.creator}, {$push:{raps : req.body.rap}}, function(err, rap) {
			res.send(rap)
		})

	}
	
}


module.exports = apiController;