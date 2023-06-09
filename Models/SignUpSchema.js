const mongoose = require("mongoose");

const signInModel = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, min: 8 },
  token: { type: String, default: "" },
});

module.exports = mongoose.model("student-data", signInModel);
