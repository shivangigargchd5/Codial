const express = require('express');
const app = express();
const port = 5000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'));

app.listen(port,((err)=>{
    if(err){
        console.log(`Error while runnning the server: ${err}`);
    }
    console.log(`The server is running successfully on port: ${port}`);
}));