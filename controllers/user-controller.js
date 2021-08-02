const User = require('../models/user');
module.exports.profile = function (req, res) {
    return res.render('user-profile', {
        title: "User Profile",
    });
}

module.exports.newUser = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-up', {
        title: "signing_up"
    })
}

module.exports.existingUser = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-in', {
        title: "signing_in"
    })
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("Error while matching email");
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("Error while creating a new user");
                    return;
                }
                res.cookie('user_id',user.id);
                return res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
        }
    });

}

module.exports.createSession = function (req, res) {
  return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}

