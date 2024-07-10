// models/Customer.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  mobileNumber: String,
  username: String,
  epin1: Boolean,
  epin2: Boolean,
});

module.exports = mongoose.model('Customer', CustomerSchema);
