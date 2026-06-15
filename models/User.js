const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  imageUrl: String
});

module.exports = mongoose.model("User", userSchema);
