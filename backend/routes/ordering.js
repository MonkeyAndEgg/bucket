const express = require('express');
const OrderController = require('../controllers/ordering');

const router = express.Router();

router.post('/api/orders', OrderController.createOrder);

router.put('/api/orders/:id', OrderController.updateOrder);

router.get('/api/orders/:userId', OrderController.getOrder);

// For Testing purpose
router.get('/api/orders', OrderController.getOrders);

router.delete('/api/orders/:id', OrderController.deleteOrder);

module.exports = router;
