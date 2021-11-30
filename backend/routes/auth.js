const express = require('express');
const AuthController = require('../controllers/auth');

const router = express.Router();

router.post('/api/signup', AuthController.createUser);

router.post("/api/signin", AuthController.loginUser);

router.get("/api/user", AuthController.getUser);

module.exports = router;
