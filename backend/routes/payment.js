const express = require('express');
const PaymentController = require('../controllers/payment');

const router = express.Router();

router.post('/api/payment', PaymentController.createPayment);

router.get('/api/payment', PaymentController.getPayments);

module.exports = router;
