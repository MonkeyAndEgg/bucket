module.exports = (req, res, next) => {
  try {
    const token = req.session.jwt;
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