const ORDER_STATUS = require('../constants/order-status');
const Order = require('../models/order');
const Product = require('../models/product');

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(404).send({
        message: `Cannot find the order with given id: ${req.params.id}`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId
    }).populate('products.product');
    if (orders.length > 0) {
      // the user Id is assumed to be unique which expects only one cart for each userId
      res.status(200).send(orders);
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
}

exports.deleteOrder = async (req, res) => {
  try {
    const result = await Order.deleteOne({
      _id: req.params.id
    });
    if (result.deletedCount > 0) {
      res.status(200).send({
        message: `Order with id: ${req.params.id} is deleted.`
      });
    } else {
      res.status(404).send({
        message: 'The order does not exist or you are not authorized to delete it.'
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

exports.createOrder = async (req, res) => {
  try {
    const { userId, productDataList } = req.body;
    let products = [];
    if (productDataList.length === 0) {
      return res.status(400).send({
        message: 'Cannot generate order without any products'
      });
    }
    for (const productData of productDataList) {
      const product = await Product.findById(productData.productId);
      if (!product) {
        return res.status(404).send({
          message: 'There is one or more product cannot be found'
        });
      }
      products.push({
        product,
        quantity: productData.quantity
      });
    }
    const order = new Order({
      userId,
      products,
      status: ORDER_STATUS.WAIT_TO_DELIVER,
      trackingNum: 'Tracking#123'
    });
    await order.save();
    return res.status(201).send(order);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}
