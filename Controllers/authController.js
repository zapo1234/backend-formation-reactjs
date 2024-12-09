// /controllers/authController.js

const bcrypt = require('bcryptjs');  // Importer bcryptjs
const jwt = require('jsonwebtoken');
const db = require('../Config/db.js');  // Importer la connexion à la base de données
const dotenv = require('dotenv');

dotenv.config(); // Charger les variables d'environnement

// Fonction de connexion
const login = (req, res) => {
  const { email, password } = req.body;

  // Requête SQL pour trouver l'utilisateur
  db.query('SELECT id,email,password,type_account,is_admin FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête SQL:', err);
      return res.status(500).send('Erreur serveur');
    }

    // Si aucun utilisateur trouvé
    if (results.length === 0) {
      return res.status(401).json({ message: 'Email incorrect !' });
    }

    // Récupérer le mot de passe haché depuis la base de données
    const user = results[0];

    // Comparaison du mot de passe envoyé avec le mot de passe haché dans la base de données
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erreur lors de la comparaison des mots de passe:', err);
        return res.status(500).send('Erreur serveur');
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Mot de pass incorrecte !' });
      }

      req.session.userId = user.id;  // Sauvegarder l'ID de l'utilisateur dans la session
      req.session.userEmail = user.email;  // Sauvegarder l'email dans la session
       
      // Générer un token JWT
      const token = jwt.sign(
        { email: user.email, id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '3h' }
      );

      res.json({
        accessToken: token,
        session: {
          userId: req.session.userId,  // Renvoi de l'ID de l'utilisateur
          userEmail: req.session.userEmail  // Renvoi de l'email de l'utilisateur
        }
      });
    });
  });
};


const forgotPassword =(req, res) =>{



};

module.exports = { login,forgotPassword };
