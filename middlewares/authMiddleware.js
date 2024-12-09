// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secret =  process.env.JWT_SECRET;  // Assurez-vous d'utiliser la même clé secrète utilisée lors de la création du token

// Middleware d'authentification
const authenticate = (req, res, next) => {
  // Récupérer le token dans l'en-tête Authorization
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }

  // Vérifier si le token est valide
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }

    // Le token est valide, nous ajoutons l'objet `user` à la requête
    req.user = decoded;  // Vous pouvez ajouter ici des informations spécifiques à l'utilisateur (ex: ID)
    next();  // Passer au prochain middleware ou à la route
  });
};

module.exports = authenticate;
