const express = require('express');
const router = express.Router();
const userController = require('../../Controllers/userController');  
const authenticateToken = require('../../middlewares/authMiddleware');// protection middle route.


// Route pour récupérer tous les utilisateurs - protégée par le middleware
router.get('/users', authenticateToken, userController.getAllUsers);

// Route pour récupérer un utilisateur par ID - protégée par le middleware
router.get('/users/:id', authenticateToken, userController.getUserById);

module.exports = router;
