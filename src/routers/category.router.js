const express = require('express');
const { CategoryController } = require('../controllers');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();
router.post('/', validateJWT, CategoryController.createCategory);
router.get('/', validateJWT, CategoryController.getAll);

module.exports = router;