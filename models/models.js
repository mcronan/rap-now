var mongoose = require('mongoose');

// one schema for users, one for raps
var userSchema = mongoose.Schema({
	userID : [String]
})

var rapSchema = mongoose.Schema({
	rap : String,
	date: String
})

// this is the collection name! mongoose 
// lowercases it and pluralises it
var Rap = mongoose.model('Rap', rapSchema);
var UserID = mongoose.model('UserID', userSchema);


// var Schema = {
// 	Rap  : Rap,
// 	UserID : UserID
// }
// mongoose.schema.objectID
// module.exports = UserID;
module.exports = Rap;

