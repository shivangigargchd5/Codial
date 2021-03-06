const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = function(req,res){
  Post.find({}).populate('user').populate({
    path:'comment',
    populate:{
      path:'user'
    }
  }).exec(function(err,posts){
      return res.render('home',{
          title:"Home Page",
          post:posts
      })
  })
}

