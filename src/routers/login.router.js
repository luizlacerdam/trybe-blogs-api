const express = require('express');
const { LoginController } = require('../controllers');

const router = express.Router();

router.post('/', LoginController.login);

module.exports = router;