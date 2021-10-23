const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  numOfStocks: { type: Number, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: false }
});

module.exports = mongoose.model('Product', productSchema);
