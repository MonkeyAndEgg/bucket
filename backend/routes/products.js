const express = require('express');
const Product = require('../models/product');
const storeFile = require('../middlewares/file-storage');

const router = express.Router();

router.post('/api/products', storeFile, async (req, res) => {
  let imageUrl;
  const { name, description, numOfStocks, price } = req.body;
  if (req.file) {
    const baseUrl = req.protocol + '://' + req.get('host');
    imageUrl = baseUrl + '/images/' + req.file.filename;
  }
  try {
    const currentTime = new Date();
    const product = new Product({
      name,
      price,
      description,
      numOfStocks,
      imageUrl,
      createdAt: currentTime.toISOString()
    });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

router.put('/api/products/:id', storeFile, async (req, res) => {
  let imageUrl;
  const { name, description, numOfStocks, price } = req.body;
  if (req.file) {
    const baseUrl = req.protocol + '://' + req.get('host');
    imageUrl = baseUrl + '/images/' + req.file.filename;
  }
  const currentTime = new Date();
  const product = await Product.findById(req.params.id);
  if (product) {
    product.set({
      name,
      price,
      description,
      numOfStocks,
      imageUrl,
      createdAt: product.createdAt,
      updatedAt: currentTime.toISOString()
    });
    await product.save();
    res.status(200).send(product);
  } else {
    res.status(404).send({
      message: `The product with id: ${req.params.id} does not exist`
    });
  }
});

router.get('/api/products', async (req, res) => {
  let query = {};
  let sortParam = {};
  if (req.query.keyword) {
    query = {
      name: new RegExp(req.query.keyword, 'i')
    };
  }

  if (req.query.sort) {
    const sortValues = req.query.sort.split(':');
    const sortField = sortValues[0];

    let sortOrder;
    if (sortValues[1] === 'asc') {
      sortOrder = 1;
    } else if (sortValues[1] === 'dsc') {
      sortOrder = -1;
    } else {
      return res.status(400).send({
        message: 'Invalid sort order'
      });
    }

    sortParam = {
      [sortField]: sortOrder
    };
  }
  const products = await Product.find(query).sort(sortParam);
  res.status(200).send(products);
});

router.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({
        message: 'The target product does not exist.'
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

router.delete('/api/products/:id', async (req, res) => {
  try {
    const result = await Product.deleteOne({
      _id: req.params.id
    });
    if (result.deletedCount > 0) {
      res.status(200).send({
        message: `Product with id: ${req.params.id} is deleted.`
      });
    } else {
      res.status(404).send({
        message: 'The product may not exist or you are not authorized to delete it.'
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

module.exports = router;
