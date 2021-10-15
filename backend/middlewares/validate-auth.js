module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).send({
        message: 'Invalid Auth'
      });
    }
    jwt.verify(token, 'my_epic_secret_key');
    next();
  } catch (err) {
    res.status(401).send({
      message: 'Invalid Auth'
    });
  }
};
