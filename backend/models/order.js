const mongoose = require('mongoose');
const address = require('./address').schema;

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
  address: {
    shipping: {
      type: address,
      required: true
    },
    billing: {
      type: address,
      required: true
    }
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  trackingNum: {
    type: String
  }
});

module.exports = mongoose.model('Order', orderSchema);
