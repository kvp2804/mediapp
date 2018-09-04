var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
const mongoose = require('mongoose');

var app = express();

//Connect to the database
mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Connected to the database mediapp")
	}
});

//Middleware module
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./app/routes/api')(app, express);
app.use('/api', api);

app.listen(config.port, function(err){
	if(err) {
		console.log(err);
	} else {

		console.log("Listening on port " + config.port );

	}

});


//Get requests
app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html');
});