const express = require('express');
const AuthController = require('../controllers/auth');

const router = express.Router();

router.post('/api/signup', AuthController.createUser);

router.post('/api/signin', AuthController.loginUser);

router.post('/api/signout', AuthController.logoutUser);

router.post('/api/reset-password', AuthController.resetPasswords);

router.post('/api/reset-password/:userId', AuthController.resetPassword);

router.get('/api/user', AuthController.getUser);

router.get('/api/token/:userId', AuthController.getUserToken);

module.exports = router;
