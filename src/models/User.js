var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	name: String,
	contest: {
		round: Number,
		progress: Number,
		token: String
	}
});

module.exports = mongoose.model('User', userSchema);