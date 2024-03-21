

const mongoose = require('mongoose');   //object
const passportLocalMongoose = require('passport-local-mongoose');


// Schema -
const userSchema = new mongoose.Schema({

//    username - PL (passport-local)
//    password - PLM (passport-local-mongoose)

   email:{
    type:String,
    trim:true,
    required:true
   },
   gender:{
    type:String,
    trim:true,
    required:true
   }
})

userSchema.plugin(passportLocalMongoose);  // always apply on schema

let User = mongoose.model('User', userSchema);
module.exports = User;












