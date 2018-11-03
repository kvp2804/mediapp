	var patient = require('../models/patient');
var config = require('../../config');

module.exports = function( app, express ){

	var apiPatients = express.Router();

	apiPatients.post('/patient', function(req, res){

		console.log(req.body.status);
		console.log(req.body.dateOfStatusChange);
		var newpatient = new patient({
			
			addmissionNo: req.body.addmissionNo,			
			patientFirstName: req.body.patientFirstName,			
			patientMiddleName: req.body.patientMiddleName,
			patientLastName: req.body.patientLastName,
			address: req.body.address,
			contactPerson: req.body.contactPerson,
			contactPersonNumber: req.body.contactPersonNumber,
			dateOfEntry: new Date(Date.now()),
			dateOfBirth: req.body.dateOfBirth,
			patientAddmissionStatus: [{
					status: req.body.status,
					dateOfStatusChange: req.body.dateOfStatusChange 
				}]
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

	apiPatients.put('/patientupdate', function(req, res){
		console.log( "This is the query id for patient update : " + req.query.id );
		var query = { _id : req.query.id };
		
		patient.findOneAndUpdate(query, {			 
			addmissionNo: req.body.addmissionNo,
			patientFirstName: req.body.patientFirstName,			
			patientMiddleName: req.body.patientMiddleName,
			patientLastName: req.body.patientLastName,
			address: req.body.address,
			contactPerson: req.body.contactPerson,
			contactPersonNumber: req.body.contactPersonNumber,
			dateOfEntry: new Date(Date.now()),
			dateOfBirth: req.body.dateOfBirth
		}, function(err, updatedPatient){

			if (err) return res.status(500).send(err);
			    // We'll create a simple object to send back with a message and the id of the document that was removed
			    // You can really do this however you want, though.
			    updatedPatient.patientAddmissionStatus.push({
					status: req.body.status,
					dateOfStatusChange: req.body.dateOfStatusChange 
				});
				updatedPatient.save();

			    const response = {
			        message: "Updated Patient successfully"
			    };
			    return res.status(200).send(response);
			});
	});


	apiPatients.delete('/patientdelete', function(req, res){

		console.log( "This is the query id for patient delete : " + req.query.id );

		patient.findByIdAndRemove(req.query.id, function(err, deletedPatient){

			if (err) return res.status(500).send(err);
			    // We'll create a simple object to send back with a message and the id of the document that was removed
			    // You can really do this however you want, though.
			    const response = {
			        message: "Patient entry successfully deleted"
			    };
			    return res.status(200).send(response);
			});
	});

	return apiPatients;

}
