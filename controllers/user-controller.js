const User = require('../models/user');
module.exports.profile = function (req, res) {
   if(req.cookies.user_id){
    User.findById(req.cookies.user_id,((err, profile) => {
        if (err) {
            console.log("error");
            return;
        }
        if(profile){
        return res.render('user-profile', {
            title: "User Profile",
            profile: profile
        });
    }
    else{
        console.log("User not found");
        return res.redirect('./sign-in');
    }

    }));
}
else{
      console.log("cookie not found");
      return res.redirect('./sign-in');
}
}
module.exports.newUser = function (req, res) {
    return res.render('sign-up', {
        title: "signing_up"
    })
}

module.exports.existingUser = function (req, res) {
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
                return res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
        }
    });

}

module.exports.createSession = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {   //try finding the email entered by the user
        if (err) {                                              //catch errors
            console.log("Error while signing in the user");
            return;
        }
        if (user) {                                             //if email is found in the db
            if (user.password != req.body.password) {             //check if entered password matches the password in db
                return res.redirect('back');                  //password not found
            }
            res.cookie('user_id', user.id);
            res.redirect('profile');                     //password found
        }
        else {
            return res.redirect('back');                     //if email was not found
        }
    })

}

