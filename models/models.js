var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var balanceSchema = new mongoose.Schema({
	created_by: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	text: String,
	value: Number
});

var budgetSchema = new mongoose.Schema({
	created_by: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	name: String
});

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
})

mongoose.model('Budget', budgetSchema);
mongoose.model('Balance', balanceSchema);
mongoose.model('User', userSchema);
