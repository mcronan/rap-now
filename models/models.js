var mongoose = require('mongoose');

// one schema for users, one for raps
// var userSchema = mongoose.Schema({
// 	userID   : String,
// })

var rapSchema = mongoose.Schema({
	raps 	: String,
	date	: String,
	creator : String
// no need for populate, only getting one piece of data
})


// this is the collection name! mongoose 
// lowercases it and pluralises it
var Rap = mongoose.model('Rap', rapSchema);
// var UserID = mongoose.model('UserID', userSchema);


module.exports = {
	// UserID : UserID,
	Rap    : Rap
}

