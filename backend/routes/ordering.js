const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product');

const router = express.Router();

router.post('/api/orders', async (req, res) => {
  const { userId, productDataList } = req.body;
  // one user suppose to have only one cart
  let cart = await Cart.findOne({ userId });
  if (cart) {
    return res.status(400).send({
      message: 'The cart already exist'
    });
  } else {
    let products = [];
    for (const productData of productDataList) {
      const product = await Product.findById(productData.product)
      if (!product) {
        return res.status(400).send({
          message: 'There is one or more product cannot be found'
        });
      }
      products.push({
        product,
        quantity: productData.quantity
      });
    }
    cart = new Cart({
      userId,
      products
    });
    await cart.save();
  }
  return res.status(201).send(cart);
});

router.put('/api/orders/:id', async (req, res) => {
  const { userId, productDataList } = req.body;
  let products = [];
  for (const productData of productDataList) {
    const product = await Product.findById(productData.product)
    if (!product) {
      return res.status(400).send({
        message: 'There is one or more product cannot be found'
      });
    }
    products.push({
      product,
      quantity: productData.quantity
    });
  }
  const cart = await Cart.findById(req.params.id);
  if (cart) {
    cart.set({
      userId,
      products
    });
    await cart.save();
  } else {
    res.status(404).send({
      message: `Cannot find the cart with given id: ${req.params.id}`
    });
  }
  res.status(200).send(cart);
});

router.get('/api/orders/:userId', async (req, res) => {
  try {
    const orders = await Cart.find({
      userId: req.params.userId
    }).populate('products.product');
    if (orders.length > 0) {
      // the user Id is assumed to be unique which expects only one order(cart) for each userId
      res.status(200).send(orders[0]);
    } else {
      res.status(404).send({
        message: `Cannot find the cart with given user id: ${req.params.userId}`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

// For Testing purpose
router.get('/api/orders', async (req, res) => {
  const orders = await Cart.find().populate('products.product');

  res.status(200).send(orders);
});

router.delete('/api/orders/:id', async (req, res) => {
  try {
    const result = await Cart.deleteOne({
      _id: req.params.id
    });
    if (result.deletedCount > 0) {
      res.status(200).send({
        message: `Cart with id: ${req.params.id} is deleted.`
      });
    } else {
      res.status(404).send({
        message: 'The cart may not exist or you are not authorized to delete it.'
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

module.exports = router;
