var income = require('../models/income');
var config = require('../../config');


module.exports = function( app, express ){

	var apiIncome = express.Router();

	apiIncome.post('/income', function(req, res){

		var newExpense = new income({
			
			incomeFor: req.body.id,
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

		income.find({}, function(err, incomes){

			if(err){
				res.send(err);
				return;
			}

			res.json(incomes);

		});
	});


	apiIncome.get('/specificincome', function(req, res){

		income.findOne({			
			_id: req.query.id

		}).select('_id incomeFor incomeDate description incomeCategory amount').exec(function(err, specificincome){

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

		}).select('_id incomeFor incomeDate description incomeCategory amount').exec(function(err, incomebydateforspecificpatient){

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

		}).select('_id incomeFor incomeDate description incomeCategory amount').exec(function(err, incomebydateforallpatient){

			if(err){
				res.send(err);
			}

			res.json(incomebydateforallpatient);
		});
	});

	apiIncome.get('/incomeforspecificpatient', function(req, res){

		income.find({			
			incomeFor: req.query.id

		}).select('_id incomeFor incomeDate description incomeCategory amount').exec(function(err, forspecificpatient){

			if(err){
				res.send(err);
			}

			res.json(forspecificpatient);
		});
	});


	return apiIncome;

}
