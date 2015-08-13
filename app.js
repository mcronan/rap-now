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


app.get('/', indexController.index);
app.get('/templates/:templateName/', indexController.templates);

app.get('/api/raps', apiController.get);
app.post('/api/raps', apiController.create);





app.listen(process.env.PORT || 5000);