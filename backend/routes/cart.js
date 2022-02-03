const express = require('express');
const CartController = require('../controllers/cart');

const router = express.Router();

router.post('/api/cart', CartController.createCart);

router.put('/api/cart/:id', CartController.updateCart);

router.get('/api/cart/:userId', CartController.getCart);

// For Testing purpose
router.get('/api/cart', CartController.getCarts);

router.delete('/api/cart/:id', CartController.deleteCart);

module.exports = router;
