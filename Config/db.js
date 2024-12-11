// /config/db.js

const mysql = require('mysql2');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis .env
dotenv.config();

// Créer la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // Récupérer l'hôte de la base de données depuis .env
  user: process.env.DB_USER,       // Utilisateur de la base de données
  password: process.env.DB_PASSWORD, // Mot de passe
  database: process.env.DB_NAME    // Nom de la base de données
  
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;
