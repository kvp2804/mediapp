var income = require('../models/income');
var config = require('../../config');

module.exports = function( app, express ){

	var apiIncome = express.Router();

	apiIncome.post('/income', function(req, res){

		var newExpense = new income({
			
			incomeFor: req.body.incomeFor,
			incomeDate: req.body.incomeDate,
			description: req.body.description,
			incomeCategory: req.body.incomeCategory,
			amount: req.body.amount
		})

		newExpense.save(function(err){

			if(err){
				res.send(err);
				return;				
			}

			res.json({message: 'Income submitted successfully!'});

		});

	});

	apiIncome.get('/income', function(req, res){		

		income.find({}).
			populate({path: 'incomeFor', select: ['patientFirstName', 'patientLastName']}).
			 exec(	function(err, income){

					if(err){
						res.send(err);
						return;
					}

					res.json(income);
			 	});
		
	});


	apiIncome.get('/specificincome', function(req, res){

		income.findOne({			
			_id: req.query.id

		}).
		populate({path: 'incomeFor', select: ['patientFirstName', 'patientLastName']}).
			select('_id incomeFor incomeDate description incomeCategory amount').
				exec(function(err, specificincome){

					if(err){
						res.send(err);
					}

					res.json(specificincome);
				});
	});

	apiIncome.get('/incomebydateforspecificpatient', function(req, res){

		income.find({			
			incomeFor: req.query.id,
			incomeDate: {
				$gte: req.query.startDate,
				$lte: req.query.endDate
			}

		}).
		populate({path: 'incomeFor', select: ['patientFirstName', 'patientLastName']}).
			select('_id incomeFor incomeDate description incomeCategory amount').exec(function(err, incomebydateforspecificpatient){

			if(err){
				res.send(err);
			}

			res.json(incomebydateforspecificpatient);
		});
	});

	apiIncome.get('/incomebydateforallpatient', function(req, res){

		income.find({						
			incomeDate: {
				$gte: req.query.startDate,
				$lte: req.query.endDate
			}

		}).
		populate({path: 'incomeFor', select: ['patientFirstName', 'patientLastName']}).
			select('_id incomeFor incomeDate description incomeCategory amount').exec(function(err, incomebydateforallpatient){

			if(err){
				res.send(err);
			}

			res.json(incomebydateforallpatient);
		});
	});

	apiIncome.get('/incomeforspecificpatient', function(req, res){

		income.find({			
			incomeFor: req.query.incomeFor
		}).
		populate({path: 'incomeFor', select: ['patientFirstName', 'patientLastName']}).
		    select('_id incomeFor incomeDate description incomeCategory amount').exec(function(err, forspecificpatient){

			if(err){
				res.send(err);
			}

			res.json(forspecificpatient);
		});
	});

	apiIncome.put('/incomeupdate', function(req, res){
		console.log( "This is the query id for income update : " + req.query.id );
		var query = { _id : req.query.id };
		var newIncome = new income({			 
			description: req.body.description,
			incomeCategory: req.body.incomeCategory,
			amount: req.body.amount
		});
		income.findOneAndUpdate(query, {			 
			description: req.body.description,
			incomeCategory: req.body.incomeCategory,
			amount: req.body.amount
		}, function(err, updatedIncome){

			if (err) return res.status(500).send(err);
			    // We'll create a simple object to send back with a message and the id of the document that was removed
			    // You can really do this however you want, though.
			    const response = {
			        message: "Updated Income successfully"
			    };
			    return res.status(200).send(response);
			});
	});

	apiIncome.delete('/incomedelete', function(req, res){

		console.log( "This is the query id for income delete : " + req.query.id );

		income.findByIdAndRemove(req.query.id, function(err, deletedIncome){

			if (err) return res.status(500).send(err);
			    // We'll create a simple object to send back with a message and the id of the document that was removed
			    // You can really do this however you want, though.
			    const response = {
			        message: "Income entry successfully deleted"
			    };
			    return res.status(200).send(response);
			});
	});


	return apiIncome;

}
