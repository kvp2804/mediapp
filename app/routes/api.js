var patient = require('../models/patient');
var config = require('../../config');


module.exports = function( app, express ){

	var api = express.Router();

	api.post('/admit', function(req, res){

		var newpatient = new patient({
			
			patientFirstName: req.body.patientFirstName,			
			patientMiddleName: req.body.patientMiddleName,
			patientLastName: req.body.patientLastName,
			address: req.body.address,
			contactPerson: req.body.contactPerson,
			contactPersonNumber: req.body.contactPersonNumber
		})

		newpatient.save(function(err){

			if(err){
				res.send(err);
				return;				
			}

			res.json({message: 'Patient admitted successfully!'});

		});

	});

	api.get('/allpatients', function(req, res){

		patient.find({}, function(err, patients){

			if(err){
				res.send(err);
				return;
			}

			res.json(patients);

		});
	});


	api.get('/specificpatient', function(req, res){

		patient.findOne({
			patientFirstName: req.headers.patientfirstname			
		}).select('_id patientFirstName patientLastName').exec(function(err, specificpatient){

			if(err){
				res.send(err);
			}

			res.json(specificpatient);
		});
	});


	return api;

}
