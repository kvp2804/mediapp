var mongoose = require('mongoose');
//var patient = require('./patient');

var schema = mongoose.Schema;

var incomeSchema = new schema({	
	
	incomeFor: {type: mongoose.Schema.Types.ObjectId, ref: 'patient'},
	dateOfEntry: { type: Date, default: Date.now },
	incomeDate: Date,
	description: String,
	incomeCategory: String,
	amount: Number
});

module.exports = mongoose.model('income', incomeSchema );