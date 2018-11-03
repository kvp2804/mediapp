var mongoose = require('mongoose');
var patient = require('./patient');

var schema = mongoose.Schema;


var expenseSchema = new schema({	
	
	expenseFor: {type: mongoose.Schema.Types.ObjectId, ref: 'patient'},
	dateOfEntry: { type: Date, default: Date.now },
	expenseDate: Date,
	description: String,
	expenseCategory: String,
	amount: Number
});

module.exports = mongoose.model('expense', expenseSchema );