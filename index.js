const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const User = require('./models/user');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const app = express();

const port = 5000;

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(session({
    name:'codial',
    secret:'anything',
    saveUninitialized:false,
    restore:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        if(err){
            console.log("Error while session");
        }
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));



app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,((err)=>{
    if(err){
        console.log(`Error while runnning the server: ${err}`);
    }
    console.log(`The server is running successfully on port: ${port}`);
}));