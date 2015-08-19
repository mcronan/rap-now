var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/api.js')

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/rapnow');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/battle', indexController.index);
app.get('/', indexController.landing);

app.get('/templates/:templateName/', indexController.templates);

app.get('/api/raps', apiController.get);
app.post('/api/raps', apiController.rapUpdate);

// app.get('/api/userIDs', apiController.userRoute);
// this sends a $http request so doesn't 
// use the api/raps route
app.post('/rapUrl', apiController.rapUrl);

app.listen(process.env.PORT || 3500);