var patient = require('../models/patient');
var config = require('../../config');


module.exports = function( app, express ){

	var apiPatients = express.Router();

	apiPatients.post('/patient', function(req, res){

		var newpatient = new patient({
			
			patientFirstName: req.body.patientFirstName,			
			patientMiddleName: req.body.patientMiddleName,
			patientLastName: req.body.patientLastName,
			address: req.body.address,
			contactPerson: req.body.contactPerson,
			contactPersonNumber: req.body.contactPersonNumber,
			dateOfEntry: new Date(Date.now()),
			dateOfBirth: req.body.dateOfBirth
		})

		newpatient.save(function(err){

			if(err){
				res.send(err);
				return;				
			}

			res.json({message: 'Patient admitted successfully!'});

		});

	});

	apiPatients.get('/patient', function(req, res){

		patient.find({}, function(err, patients){

			if(err){
				res.send(err);
				return;
			}

			res.json(patients);

		});
	});


	apiPatients.get('/specificpatient', function(req, res){

		patient.findOne({			
			_id: req.query.id

		}).select('_id patientFirstName patientMiddleName patientLastName contactPersonNumber').exec(function(err, specificpatient){

			if(err){
				res.send(err);
			}

			res.json(specificpatient);
		});
	});


	return apiPatients;

}
