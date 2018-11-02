var mongoose = require('mongoose');

var schema = mongoose.Schema;

var patientSchema = new schema({	
	
	addmissionNo: Number,
	patientFirstName: String,
	patientMiddleName: String,
	patientLastName: String,
	address: String,
	contactPerson: String,
	contactPersonNumber: String,
	dateOfEntry: { type: Date, default: Date.now },
	dateOfBirth: Date,	
	patientAddmissionStatus: [{
			status: { type: String, default: 'Admitted' },
			dateOfStatusChange: Date
		}]	
	});

module.exports = mongoose.model('patient', patientSchema );