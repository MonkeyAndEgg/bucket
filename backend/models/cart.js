const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
