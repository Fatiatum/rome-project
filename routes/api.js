var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Balance = mongoose.model('Balance');
var Budget = mongoose.model('Budget');
//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/balance', isAuthenticated);

router.route('/balance')
	//creates a new input
	.post(function(req, res){

		var input = new Balance();
		input.text = req.body.text;
		input.value = req.body.value;
		input.created_by = req.body.created_by;
		input.save(function(err, input) {
			if (err){
				return res.send(500, err);
			}
			return res.json(input);
		});
	})
	//gets all inputs
	.get(function(req, res){
		Balance.find(function(err, inputs){
			if(err){
				return res.send(500, err);
			}
			return res.send(200,inputs);
		});
	});

//input-specific commands. likely won't be used
router.route('/balance/:id')
	//gets specified input
	.get(function(req, res){
		Balance.findById(req.params.id, function(err, input){
			if(err)
				res.send(err);
			res.json(input);
		});
	}) 
	//updates specified input
	.put(function(req, res){
		Balance.findById(req.params.id, function(err, input){
			if(err)
				res.send(err);

			input.created_by = req.body.created_by;
			input.text = req.body.text;
			input.value = req.body.value;

			input.save(function(err, input){
				if(err)
					res.send(err);

				res.json(input);
			});
		});
	})
	//deletes the input
	.delete(function(req, res) {
		Balance.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted :(");
		});
	});

router.use('/budget', isAuthenticated);

router.route('/budget')
	//creates a new budget
	.post(function(req, res){

		var budget = new Budget();
		budget.name = req.body.name;
		budget.created_by = req.body.created_by;
		budget.save(function(err, budget) {
			if (err){
				return res.send(500, err);
			}
			return res.json(budget);
		});
	})
	//gets all budgets
	.get(function(req, res){
		Budget.find(function(err, budgets){
			if(err){
				return res.send(500, err);
			}
			return res.send(200,budgets);
		});
	});

//budget-specific commands. likely won't be used
router.route('/budget/:id')
	//gets specified budget
	.get(function(req, res){
		Budget.findById(req.params.id, function(err, budget){
			if(err)
				res.send(err);
			res.json(budget);
		});
	}) 
	//updates specified budget
	.put(function(req, res){
		Budget.findById(req.params.id, function(err, budget){
			if(err)
				res.send(err);

			budget.created_by = req.body.created_by;
			budget.name = req.body.name;

			budget.save(function(err, budget){
				if(err)
					res.send(err);

				res.json(budget);
			});
		});
	})
	//deletes the budget
	.delete(function(req, res) {
		Budget.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted :(");
		});
	});

module.exports = router;