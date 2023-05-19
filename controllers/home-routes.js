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

  // Login AFTER SIGNUP route
router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('loginAFTERSIGNUP');
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

// Login POST request that saves new user data
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
    console.log(savedWords);
    const loggedIn = true;
    res.render('dashboard', { savedWords, loggedIn });
  });



//POST request to save word to database
router.post('/saved', async (req, res) => {
  console.log(req.body)
  try {
    const savedWord = await Saved.create({
      word: req.body.word,
      user_email: req.body.email,
    });
    // res.status(201).json(savedWord);
    res.render('dashboard');
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save word.' });
  }
});

//DELETE request to delete word from database
router.delete('/delete', async (req, res) => {
  console.log(req.body)
  try {
    const deletedWord = await Saved.destroy({
      where: {
        word: req.body.savedWordText,
      }
    });
    res.status(201).json(deletedWord);
    res.render('dashboard');
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete word.' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

  module.exports = router;