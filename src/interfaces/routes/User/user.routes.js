const express = require('express');
const UserRepository = require('../../../infrastructure/repositories/User/user.repository');
const UserUseCase = require('../../../application/User/user.use-case');
const UserController = require('../../controllers/User/user.controller');

// Create router instance
const router = express.Router();

// Initialize dependencies
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

// Define routes with proper middleware and handlers
router.get('/', (req, res) => userController.getAllUsers(req, res));
router.post('/', (req, res) => userController.createUser(req, res));
router.get('/:id', (req, res) => userController.getUserById(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router; 