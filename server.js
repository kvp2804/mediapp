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

var apiPatients = require('./app/routes/apiPatients')(app, express);
app.use('/api', apiPatients);

var apiExpense = require('./app/routes/apiExpense')(app, express);
app.use('/api', apiExpense);

var apiIncome = require('./app/routes/apiIncome')(app, express);
app.use('/api', apiIncome);

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