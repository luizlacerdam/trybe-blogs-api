const express = require('express');
const { PostController } = require('../controllers');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();
router.get('/', validateJWT, PostController.getAll);
router.post('/', validateJWT, PostController.createPost);
router.get('/search', validateJWT, PostController.postSearch);
router.get('/:id', validateJWT, PostController.getById);
router.put('/:id', validateJWT, PostController.editPost);
router.delete('/:id', validateJWT, PostController.deletePost);

module.exports = router;