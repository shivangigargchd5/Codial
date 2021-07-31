const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();

router.get('/profile',userController.profile);

router.get('/sign-up',userController.newUser);

router.get('/sign-in',userController.existingUser);

router.post('/create',userController.create);


module.exports = router;