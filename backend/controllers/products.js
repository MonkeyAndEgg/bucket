const Product = require('../models/product');
const errHandler = require('../util/errorHandler');

exports.createProduct = async (req, res) => {
  try {
    let imageUrl;
    const { name, description, numOfStocks, price, type } = req.body;
    if (req.file) {
      const baseUrl = req.protocol + '://' + req.get('host');
      imageUrl = baseUrl + '/images/' + req.file.filename;
    }
    const currentTime = new Date();
    const product = new Product({
      name,
      price,
      description,
      numOfStocks,
      type,
      imageUrl,
      createdAt: currentTime.toISOString()
    });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    errHandler(e, res);
  }
}

exports.updateProduct = async (req, res) => {
  try {
    let imageUrl;
    const { name, description, numOfStocks, price, type } = req.body;
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
        type,
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
  } catch(e) {
    errHandler(e, res);
  }
}

exports.getProducts = async (req, res) => {
  try {
    let query = {};
    let sortParam = {};

    if (req.query.filter) {
      const filterValues = req.query.filter.split(':');
      const filterField = filterValues[0];
      const filterOptions = filterValues[1].split('-');
      if (filterField === 'keyword') {
        query = {
          name: new RegExp(filterValues[1], 'i')
        };
      } else {
        query = {
          [filterField]: {
            $in: filterOptions
          }
        };
      }
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
  } catch(e) {
    errHandler(e, res);
  }
}

exports.getProduct = async (req, res) => {
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
    errHandler(e, res);
  }
}

exports.deleteProduct = async (req, res) => {
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
    errHandler(e, res);
  }
}
