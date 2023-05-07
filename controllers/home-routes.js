const router = require('express').Router();
const User = require('../models/User');
const Words = require('../models/Words');
const Saved = require('../models/Saved');
// Login route
router.get('/', (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }
    res.render('login');
  });

// CREATE new user --> When signing up, we're saving new user info into database 
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.email = req.body.email;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//GET request to render words to webpage
router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/');
  }

  const wordData = await Saved.findAll({
    where: {
      user_email: req.session.email
    }
  }).catch((err) => { 
    res.json(err);
  });
    const savedWords = wordData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { savedWords });
  });



//POST request to save word to database
router.post('/saved', async (req, res) => {
  console.log(req.body)
  try {
    const savedWord = await Saved.create({
      word: req.body.word,
      user_email: req.body.email,
    });
    res.status(201).json(savedWord);
    res.render('dashboard');
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save word.' });
  }
});


  module.exports = router;