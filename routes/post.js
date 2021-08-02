const express = require('express');
const passport = require('passport');
const router = express.Router();
const postController = require('../controllers/post-controller');

router.post('/create',passport.checkAuthentication,postController.create);


module.exports = router;