var mongoose = require('mongoose');

// one schema for users, one for raps
var userSchema = mongoose.Schema({
	userID   : [String],
	// userRap  : [{
		// 	type :  mongoose.Schema.ObjectId, 
		// 	ref  : 'Rap'}]
})

var rapSchema = mongoose.Schema({
	rap 	: String,
	date	: String,
	creator : [{
		type    : mongoose.Schema.ObjectId, 
		ref     : 'UserID'}]
})


// this is the collection name! mongoose 
// lowercases it and pluralises it
var Rap = mongoose.model('Rap', rapSchema);
var UserID = mongoose.model('UserID', userSchema);




module.exports = {
	UserID : UserID,
	Rap    : Rap
}

