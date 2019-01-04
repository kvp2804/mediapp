var expense = require('../models/expense');
var config = require('../../config');

module.exports = function( app, express ){

	var apiExpense = express.Router();

	apiExpense.post('/expense', function(req, res){

		var newExpense = new expense({
			
			expenseFor: req.body.expenseFor,			
			expenseDate: req.body.expenseDate,
			description: req.body.description,
			expenseCategory: req.body.expenseCategory,
			expenseSource: req.body.expenseSource,
			amount: req.body.amount
		})

		newExpense.save(function(err){

			if(err){
				res.send(err);
				return;				
			}

			res.json({message: 'Expense submitted successfully!'});

		});

	});

	apiExpense.get('/expense', function(req, res){
		console.log('In apiExpense');

		expense.find({}).
			populate({path: 'expenseFor', select: ['addmissionNo', 'patientFirstName', 'patientLastName']}).
				exec(function(err, expenses){

					if(err){
						res.send(err);
						return;
					}

					res.json(expenses);

				});
	});


	apiExpense.get('/specificexpense', function(req, res){

		expense.findOne({			
			_id: req.query.id

		}).
		populate({path: 'expenseFor', select: ['addmissionNo', 'patientFirstName', 'patientLastName']}).
			select('_id expenseFor expenseDate description expenseCategory expenseSource amount').exec(function(err, specificexpense){

			if(err){
				res.send(err);
			}

			res.json(specificexpense);
		});
	});

	apiExpense.get('/expensebydateforspecificpatient', function(req, res){

		expense.find({			
			expenseFor: req.query.id,
			expenseDate: {
				$gte: req.query.startDate,
				$lte: req.query.endDate
			}

		}).
		populate({path: 'expenseFor', select: ['addmissionNo', 'patientFirstName', 'patientLastName']}).
			select('_id expenseFor expenseDate description expenseCategory expenseSource amount').exec(function(err, expensebydateforspecificpatient){

			if(err){
				res.send(err);
			}

			res.json(expensebydateforspecificpatient);
		});
	});

	apiExpense.get('/expensebydateforallpatient', function(req, res){

		expense.find({						
			expenseDate: {
				$gte: req.query.startDate,
				$lte: req.query.endDate
			}

		}).
		populate({path: 'expenseFor', select: ['addmissionNo', 'patientFirstName', 'patientLastName']}).
			select('_id expenseFor expenseDate description expenseCategory expenseSource amount').exec(function(err, expensebydateforallpatient){

			if(err){
				res.send(err);
			}

			res.json(expensebydateforallpatient);
		});
	});

	apiExpense.get('/expenseforspecificpatient', function(req, res){

		expense.find({			
			expenseFor: req.query.expenseFor

		}).
		populate({path: 'expenseFor', select: ['addmissionNo', 'patientFirstName', 'patientLastName']}).
		    select('_id expenseFor expenseDate description expenseCategory expenseSource amount').exec(function(err, forspecificpatient){

			if(err){
				res.send(err);
			}

			res.json(forspecificpatient);
		});
	});


	apiExpense.delete('/expensedelete', function(req, res){

		console.log( "This is the query id for expense delete : " + req.query.id );

		expense.findByIdAndRemove(req.query.id, function(err, deletedExpense){

			if (err) return res.status(500).send(err);
			    // We'll create a simple object to send back with a message and the id of the document that was removed
			    // You can really do this however you want, though.
			    const response = {
			        message: "deletedExpense successfully deleted"
			    };
			    return res.status(200).send(response);
			});
	});

	apiExpense.put('/expenseupdate', function(req, res){
		console.log( "This is the query id for expense update : " + req.query.id );
		var query = { _id : req.query.id };
		var newExpense = new expense({			 
			description: req.body.description,
			expenseCategory: req.body.expenseCategory,
			expenseSource: req.body.expenseSource,
			amount: req.body.amount
		});
		expense.findOneAndUpdate(query, {			 
			description: req.body.description,
			expenseCategory: req.body.expenseCategory,
			expenseSource: req.body.expenseSource,
			amount: req.body.amount
		}, function(err, updatedExpense){

			if (err) return res.status(500).send(err);
			    // We'll create a simple object to send back with a message and the id of the document that was removed
			    // You can really do this however you want, though.
			    const response = {
			        message: "updatedExpense successfully updated"
			    };
			    return res.status(200).send(response);
			});
	});


	return apiExpense;

}
