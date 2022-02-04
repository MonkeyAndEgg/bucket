const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userId: { type: String, required: true },
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
  status: {
    type: String,
    required: true
  },
  trackingNum: {
    type: String
  }
});

module.exports = mongoose.model('Order', orderSchema);
