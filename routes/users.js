const express = require('express');
const passport = require('passport');
const userController = require('../controllers/user-controller');
const router = express.Router();

router.get('/profile', passport.checkAuthentication, userController.profile);

router.get('/sign-up',userController.newUser);

router.get('/sign-in',userController.existingUser);

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
 ),userController.createSession);
    
router.get('/sign-out',userController.destroySession);

module.exports = router;