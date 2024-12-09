// models/userModel.js
const db = require('../Config/db.js');  // Connexion à la base de données

// Fonction pour récupérer tous les utilisateurs
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id,name, username, email,attribut FROM users';  // Requête pour récupérer tous les utilisateurs
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);  // Retourner l'erreur
      }
      resolve(results);  // Retourner les résultats
    });
  });
};

// Fonction pour récupérer un utilisateur par ID
const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT name, username, email FROM users WHERE id = ?';  // Requête pour récupérer un utilisateur par ID
    db.query(query, [userId], (err, results) => {
      if (err) {
        return reject(err);  // Retourner l'erreur
      }
      if (results.length === 0) {
        return reject(new Error('Utilisateur non trouvé'));
      }
      resolve(results[0]);  // Retourner l'utilisateur trouvé
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById
};
