// /services/emailService.js

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Configurer le transport SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // Exemple : 'smtp.mailtrap.io'
  port: process.env.SMTP_PORT,        // Exemple : 587 pour TLS ou 465 pour SSL
  secure: process.env.SMTP_SECURE === 'true', // true pour SSL/false pour non-SSL
  auth: {
    user: process.env.SMTP_USER,      // Votre identifiant SMTP (par exemple : 'user@example.com')
    pass: process.env.SMTP_PASS       // Votre mot de passe SMTP ou clé API
  }
});

// Fonction pour envoyer un email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.SMTP_USER,   // L'adresse email de l'expéditeur
    to: to,                        // L'adresse email du destinataire
    subject: subject,              // Le sujet de l'email
    text: text,                    // Le texte brut de l'email
    html: html                      // Le contenu HTML de l'email (si nécessaire)
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
