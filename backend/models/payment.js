const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  stripeId: {
    type: String,
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
