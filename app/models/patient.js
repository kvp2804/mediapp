var mongoose = require('mongoose');

var schema = mongoose.Schema;

var patientSchema = new schema({	
	
	patientFirstName: String,
	patientMiddleName: String,
	patientLastName: String,
	address: String,
	contactPerson: String,
	contactPersonNumber: String
	
});

module.exports = mongoose.model('patient', patientSchema );