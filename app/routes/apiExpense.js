var expense = require('../models/expense');
var config = require('../../config');


module.exports = function( app, express ){

	var apiExpense = express.Router();

	apiExpense.post('/expense', function(req, res){

		var newExpense = new expense({
			
			expenseFor: req.body.id,			
			expenseDate: req.body.expenseDate,
			description: req.body.description,
			expenseCategory: req.body.expenseCategory,
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

		expense.find({}, function(err, expenses){

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

		}).select('_id expenseFor expenseDate description expenseCategory amount').exec(function(err, specificexpense){

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

		}).select('_id expenseFor expenseDate description expenseCategory amount').exec(function(err, expensebydateforspecificpatient){

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

		}).select('_id expenseFor expenseDate description expenseCategory amount').exec(function(err, expensebydateforallpatient){

			if(err){
				res.send(err);
			}

			res.json(expensebydateforallpatient);
		});
	});

	apiExpense.get('/expenseforspecificpatient', function(req, res){

		expense.find({			
			expenseFor: req.query.id

		}).select('_id expenseFor expenseDate description expenseCategory amount').exec(function(err, forspecificpatient){

			if(err){
				res.send(err);
			}

			res.json(forspecificpatient);
		});
	});


	return apiExpense;

}
