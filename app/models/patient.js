var mongoose = require('mongoose');

var schema = mongoose.Schema;

var patientSchema = new schema({	
	
	patientFirstName: String,
	patientMiddleName: String,
	patientLastName: String,
	address: String,
	contactPerson: String,
	contactPersonNumber: String,
	dateOfEntry: { type: Date, default: Date.now },
	dateOfBirth: Date
	
});

module.exports = mongoose.model('patient', patientSchema );