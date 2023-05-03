const router = require('express').Router();
const User = require('../models/User');

// Login route
router.get('/', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('login');
});

module.exports = router;
