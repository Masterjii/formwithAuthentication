const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();  // mini application


// auth signup route -
router.get('/register', (req,res)=>{
    try{
        res.render('auth/signup');

    }
    catch(e){
        res.status(500).render('error', {err : e.message})
    }

})

router.post('/register', async (req, res) => {
    try {
      const { username, password, email, gender } = req.body;
  
      // Create a new user object
      const user = new User({ username, email, gender });
  
      // Use Passport.js for user registration (assuming Passport is configured)
      const newUser = await User.register(user, password);
  
      // Redirect to the login page on successful registration
      res.redirect('/login');
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).render('error', { err: error.message }); // Render an error page
    }
  });
  

// auth login route -
router.get('/login', (req,res)=>{
    try{
        res.render('auth/login');

    }
    catch(e){
        res.status(500).render('error', {err : e.message})
    }

})

router.post('/login',
  passport.authenticate('local', 
  {
     failureRedirect: '/login', 
     failureMessage: true 
  }),
  function(req, res) {
    res.redirect('/home');
  });

module.exports = router;

















