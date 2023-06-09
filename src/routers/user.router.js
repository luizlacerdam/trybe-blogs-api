const express = require('express');
const { UserController } = require('../controllers');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', validateJWT, UserController.getAll);
router.get('/:id', validateJWT, UserController.getById);
router.delete('/me', validateJWT, UserController.deleteUser);

module.exports = router;