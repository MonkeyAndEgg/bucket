const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  stripeId: {
    type: String,
    required: true
  },
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
  ],
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
