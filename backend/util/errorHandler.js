const errHandler = function(err, res) {
  console.log(err);
  return res.status(500).send({
    message: 'Internal server error'
  });
}

module.exports = errHandler;
