const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signUp);

module.exports = {
  router,
};
