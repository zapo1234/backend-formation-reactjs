// services/userService.js
const userModel = require('../models/userModel.js');  // Importer le modèle pour interagir avec la base de données

// Fonction pour récupérer tous les utilisateurs
const getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers();  
    return users;  // Retourner les utilisateurs récupérés
  } catch (err) {
    throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
  }
};

// Fonction pour récupérer un utilisateur par ID
const getUserById = async (userId) => {
  try {
    const user = await userModel.getUserById(userId);  
    return user;  // Retourner l'utilisateur trouvé
  } catch (err) {
    throw new Error('Erreur lors de la récupération de l\'utilisateur : ' + err.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById
};
