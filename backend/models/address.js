const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Address', addressSchema);
