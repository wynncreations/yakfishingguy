const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var AuthSchema = new mongoose.Schema({
  accessToken: String,
  userID: String,
  expiresIn: Number
});

AuthSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Auth", AuthSchema);