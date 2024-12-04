let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  street: { type: String, required: false },
  postcode: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
