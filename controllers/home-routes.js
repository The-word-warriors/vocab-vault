const router = require('express').Router();
const { User } = require('../../models');

// Login route
router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }
    res.render('login');
  });