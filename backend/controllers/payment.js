const Cart = require('../models/cart');
const Payment = require('../models/payment');
const Order = require('../models/order');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const ORDER_STATUS = require('../constants/order-status');

exports.createPayment = async (req, res) => {
  const { token, cartId, address } = req.body;

  const cart = await Cart.findById(cartId).populate('products.product');;
  if (!cart) {
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
  for (const productData of cart.products) {
    totalAmount += Math.round(productData.product.price * productData.quantity * 100) / 100;
  }
  const charge = await stripe.charges.create({
    currency: 'usd',
    amount: Math.round(totalAmount * 100),
    source: token.id
  });
  if (charge.id) {
    // generating the order once payment success
    const order = new Order({
      userId: cart.userId,
      products: cart.products,
      status: ORDER_STATUS.WAIT_TO_DELIVER,
      createdAt: new Date().toISOString(),
      address,
      total: totalAmount
    });
    await order.save();

    // clean the cart products
    cart.set({
      products: []
    });
    await cart.save();

    const payment = new Payment({
      stripeId: charge.id,
      order: order,
      amount: totalAmount
    });
    await payment.save();
    res.status(201).send({ payment });
  } else {
    res.status(500).send({
      message: 'The payment is not completed for some reasons'
    });
  }
}

exports.getPayments = async (req, res) => {
  const payments = await Payment.find().populate('products.product');

  res.status(200).send(payments);
}
