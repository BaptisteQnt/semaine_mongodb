const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); // <-- renommé ici

// Formulaire d'inscription
router.get('/register', (req, res) => {
  res.render('register');
});

// Traitement de l'inscription
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const errors = {};
  
    if (!username) {
      errors.username = "Nom d'utilisateur requis.";
    }
  
    if (!password || password.length < 6) {
      errors.password = "Mot de passe trop court (min. 6 caractères).";
    }
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      errors.username = "Nom d'utilisateur déjà utilisé.";
    }
  
    if (Object.keys(errors).length > 0) {
      req.session.errors = errors;
      return res.redirect('/register');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
  
    req.session.success = "Inscription réussie !";
    res.redirect('/login');
  });
  

// Formulaire de connexion
router.get('/login', (req, res) => {
  res.render('login');
});

// Traitement de la connexion
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username }); // <-- corrigé ici
  if (!user) return res.redirect('/login');

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.redirect('/login');

  req.session.userId = user._id;
  const redirectTo = req.session.redirectTo || '/';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
});

// Déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
9