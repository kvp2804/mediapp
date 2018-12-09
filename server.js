var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var config = require('./config');
const mongoose = require('mongoose');
var path = require('path');

var app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

app.use(express.static(path.join(__dirname, 'public')));
//Get requests
//app.get('*', function(req, res){
//	res.sendFile(__dirname + '/	');
//});