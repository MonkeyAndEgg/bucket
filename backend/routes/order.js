const express = require('express');
const OrderController = require('../controllers/order');

const router = express.Router();

router.post('/api/order', OrderController.createOrder);

router.get('/api/order/:id', OrderController.getOrder);

router.get('/api/orders/:userId', OrderController.getOrders);

router.delete('/api/order/:id', OrderController.deleteOrder);

module.exports = router;
