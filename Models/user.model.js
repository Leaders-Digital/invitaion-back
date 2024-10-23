const mongoose = require("mongoose");

const userchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
  },
  activite: {
    type: String,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  society: {
    type: String,
    default: "none",
  },
  valide: {
    type: Boolean,
    default:false,
  },
});
const User = mongoose.model("User", userchema);
module.exports = User;
