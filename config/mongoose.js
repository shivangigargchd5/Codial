const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codial-development');
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error while connection to database"));

db.once('open',function(){
    console.log("You have successfully been connected to the database");
})

module.exports=db;