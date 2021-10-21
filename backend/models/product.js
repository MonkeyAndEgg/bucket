const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  numOfStocks: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
