const express = require('express');
const Cart = require('../models/cart');
const Payment = require('../models/payment');
const stripe = require('stripe')('sk_test_MCsixaVoyBZ999wN57wTtzcH00Cw79JKBI');

const router = express.Router();

router.post('/api/payment', async (req, res) => {
  const { token, cartId } = req.body;

  const order = await Cart.findById(cartId).populate('products.product');;
  if (!order) {
    res.status(404).send({
      message: `Cannot find the cart with given id: ${cartId}`
    });
  }
  if (!token || token === '') {
    res.status(401).send({
      message: `Payment is not authorized`
    });
  }
  let totalAmount = 0;
  for (const productData of order.products) {
    totalAmount += productData.product.price * productData.quantity;
  }
  const charge = await stripe.charges.create({
    currency: 'usd',
    amount: Math.round(totalAmount * 100),
    source: token.id
  });
  const payment = new Payment({
    stripeId: charge.id,
    products: order.products,
    amount: totalAmount
  });
  await payment.save();
  res.status(201).send({ payment });
});

router.get('/api/payment', async (req, res) => {
  const payments = await Payment.find().populate('products.product');

  res.status(200).send(payments);
});

module.exports = router;
