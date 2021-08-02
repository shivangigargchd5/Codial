const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { localsName } = require('ejs');

passport.use(new LocalStrategy({
    usernameField:'email'
},function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("Error while finding the user");
            return done(err);
        }
        if(!user||user.password!=password){
            console.log("Invalid email/password");
            return done(null,false);
        }
        return done(null,user);
    })
}
))

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error while deserializing");
            return done(err);
        }
        return done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        console.log('User is Authenticated');
        return next();
    }
    console.log('User is not Authenticated');
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
       res.locals.user = req.user;
    }
    next();
}

module.exports = passport;