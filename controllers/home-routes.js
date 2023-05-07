const router = require('express').Router();
const User = require('../models/User');
const SavedWord = require('../models/Saved.js');
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

//Dashboard route
router.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    // res.redirect('/dashboard');
    res.render('dashboard');
    return;
  }
});

router.post('/dashboard/saved', async (req, res) => {
  console.log(req.body)
  try {
    const savedWord = await SavedWord.create({
      word: req.body.word,
      definitions: req.body.defString,
      user_email: req.body.user_email,
    });

    res.status(201).json(savedWord);
    res.render('dashboard');
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save word.' });
  }
});


  module.exports = router;