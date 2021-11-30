const express = require('express');
const storeFile = require('../middlewares/file-storage');
const ProductController = require('../controllers/products');

const router = express.Router();

router.post('/api/products', storeFile, ProductController.createProduct);

router.put('/api/products/:id', storeFile, ProductController.updateProduct);

router.get('/api/products', ProductController.getProducts);

router.get('/api/products/:id', ProductController.getProduct);

router.delete('/api/products/:id', ProductController.deleteProduct);

module.exports = router;
