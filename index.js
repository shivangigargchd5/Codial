const express = require('express');
const app = express();
const port = 8000;

app.use('/',require('./routes'));

app.listen(port,((err)=>{
    if(err){
        console.log(`Error while runnning the server: ${err}`);
    }
    console.log(`The server is running successfully on port: ${port}`);
}));