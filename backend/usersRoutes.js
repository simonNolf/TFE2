const express = require('express');
const db = require('./database');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL, // Votre adresse e-mail Gmail
    pass: process.env.MDP, // Votre mot de passe Gmail
  },
});

router.get('/getMatricule', async (req, res) => {
  try {
    const matricule = await db.one('select matricule from public.user');
    
    // Envoi du matricule en tant que réponse
    res.send(`Matricule : ${matricule.matricule}`);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête SQL :', error);
    res.status(500).send('Erreur serveur');
  }
});

router.get('/:matricule', async (req, res) => {
  const matriculeToCheck = req.params.matricule;

  try {
    const result = await db.oneOrNone('SELECT COUNT(*) FROM "user" WHERE matricule = $1', [matriculeToCheck]);

    if (result && result.count > 0) {
      res.status(200).json({ exists: true, message: `Le matricule ${matriculeToCheck} existe dans la table "user".` });
    } else {
      res.status(404).json({ exists: false, message: `Le matricule ${matriculeToCheck} n'existe pas dans la table "user".` });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du matricule :', error);
    res.status(500).json({ error: 'Erreur lors de la vérification du matricule.' });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  const { matricule, password } = req.body;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await db.oneOrNone('SELECT * FROM "user" WHERE matricule = $1', [matricule]);

    if (user) {
      // Comparaison du mot de passe avec celui stocké dans la base de données
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        if (user.status === 'active') {
          res.json({ success: true, message: 'Connexion réussie' });
        } else if (user.status === 'pending') {
          res.status(401).json({ success: false, message: 'Votre compte est en attente. Veuillez consulter vos e-mails pour activer votre compte.' });
        } else if (user.status === 'archived') {
          res.status(401).json({ success: false, message: 'Votre compte est archivé. Veuillez contacter le secrétariat pour plus d\'informations.' });
        }
      } else {
        res.status(401).json({ success: false, message: 'Mot de passe incorrect' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la connexion' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { matricule, password, email } = req.body;

    // Générer un sel pour bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hacher le mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(password, salt);

    // Enregistrement dans la base de données avec le mot de passe haché et le sel
    await db.none('INSERT INTO "user" (matricule, password, salt, status) VALUES($1, $2, $3, $4)',
                  [matricule, hashedPassword, salt, 'pending']);

    // Envoi d'un e-mail avec le lien d'activation
    const activationLink = `${process.env.API_URL}/activate/${matricule}`;
    const mailOptions = {
      from: process.env.MAIL, // Votre adresse e-mail Gmail
      to: 'simon.nolf@gmail.com',  // Utilisez l'adresse e-mail fournie dans la demande
      subject: 'Activation de compte',
      html: `
        <a href="${activationLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Activer le compte</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Inscription réussie. Vérifiez votre e-mail pour activer votre compte.' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

module.exports = router;
