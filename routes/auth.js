const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');  // Assurez-vous que le chemin est correct

// Définir la route POST /login
router.post('/login', authController.login); // Assurez-vous que le controller `login` est bien défini
// Route pour demander la réinitialisation du mot de passe
router.post('/forgot-password', authController.forgotPassword);


module.exports = router;
