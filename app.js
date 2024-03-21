const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const passport = require('passport');  //passport
const LocalStrategy = require('passport-local').Strategy;     //passport
const User = require('./models/User');   //passport

let configSesion = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  };

  mongoose.set('strictQuery', true);
  mongoose.connect('mongodb://127.0.0.1:27017/nodeAuth')
  .then(()=>{console.log("db connected")})
  .catch((err)=>{console.log("error is:", err)})
  
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname , 'views'))
  app.use(express.static(path.join(__dirname, 'public')))    // Static files
  
  app.use(express.urlencoded({extended:true}))  // form data ke liye body parser
  app.use(session(configSesion));

  app.use(passport.initialize());  //passport
  app.use(passport.session());     //passport
  // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
  // passport.use(User.createStrategy());  //passport  
  passport.serializeUser(User.serializeUser());   //passport
  passport.deserializeUser(User.deserializeUser());   //passport
  
  // use static authenticate method of model in LocalStrategy
  passport.use(new LocalStrategy(User.authenticate()));
  
//   app.use( (req,res,next)=>{
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
//   });
  
// Routes -
app.use(authRoutes);


app.use('/home', (req,res)=>{
    res.send('Hy, You are logged in')
})

app.use('/', (req,res)=>{
    res.send('Hy, please logged in')
})

let PORT = 8080;
app.listen(PORT , ()=>{
console.log(`server is connected at port: ${PORT}`);
})
