const express = require('express');
const { CategoryController } = require('../controllers');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();
router.post('/', validateJWT, CategoryController.createCategory);

module.exports = router;