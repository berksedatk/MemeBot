const mongoose = require('mongoose');

const starSchema = new mongoose.Schema({
  userID: String,
  username: String,
  stars: String
});

module.exports = mongoose.model("starboard", starSchema);
