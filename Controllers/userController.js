// controllers/userController.js
const userService = require('../services/userService.js');  // Importer le service métier

// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();  // Appeler la fonction du service pour récupérer tous les utilisateurs
    res.status(200).json(users);  // 
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err.message });
  }
};

// Fonction pour récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;  // Récupère l'ID de l'utilisateur à partir de l'URL
  try {
    const user = await userService.getUserById(userId);  // Appeler la fonction du service pour récupérer un utilisateur par ID
    res.status(200).json(user);  
  } catch (err) {
    res.status(404).json({ message: 'Utilisateur non trouvé', error: err.message });
  }
};
