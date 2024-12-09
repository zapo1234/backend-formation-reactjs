// server.js

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');  // Importer express-session
const cors = require('cors');  // Importer le package cors

// Importer les routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/Users/userRoutes');
  // Utilisez le bon chemin relatif ici

dotenv.config(); // Charger les variables d'environnement

const app = express();
app.use(bodyParser.json()); // Pour parser les corps des requêtes HTTP en JSON

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Configuration de la session
app.use(session({
  secret: process.env.SESSION_SECRET,  // Remplacez par une clé secrète
  resave: false,  // Ne pas sauvegarder la session si elle n'a pas été modifiée
  saveUninitialized: true,  // Sauvegarder les sessions même si elles sont non initialisées
  cookie: {
    secure: false,  // En développement, ne pas utiliser le cookie en HTTPS
    maxAge: 1000 * 60 * 60  // Durée de vie du cookie : 1 heure
  }
}));

const port = process.env.PORT || 5000;

// Middleware CORS pour React.js
const corsOptions = {
  origin: 'http://localhost:3000',  // Autoriser l'accès uniquement depuis localhost:3000 (où React.js tourne en développement)
  methods: 'GET,POST,PUT,DELETE',  // Méthodes autorisées pour les requêtes
  allowedHeaders: 'Content-Type,Authorization',  // En-têtes autorisés
  credentials: true,  // Si vous voulez accepter les cookies ou tokens
};

// Appliquer CORS au serveur
app.use(cors(corsOptions));

// Utiliser les routes d'authentification
app.use('/api/auth', authRoutes);
// Routes des utilisateurs
app.use('/api', userRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
