var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  contest: {
    round: Number,
    progress: Number,
    token: String,
    date: {
      type: Date,
      default: Date.now
    }
  }
});

module.exports = mongoose.model('User', userSchema);