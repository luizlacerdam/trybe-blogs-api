const express = require('express');
const { PostController } = require('../controllers');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();
router.get('/:id', validateJWT, PostController.getById);
router.get('/', validateJWT, PostController.getAll);
router.post('/', validateJWT, PostController.createPost);

module.exports = router;