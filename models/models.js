var mongoose = require('mongoose');

// one schema for users, one for raps
var userSchema = mongoose.Schema({
	fbID : String
})

var rapSchema = mongoose.Schema({
	rap : String,
	date: String
})

// this is the collection name! mongoose 
// lowercases it and pluralises it
var Rap = mongoose.model('Rap', rapSchema);

// mongoose.schema.objectID
module.exports = Rap;
