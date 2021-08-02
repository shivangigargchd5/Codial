const express = require('express');
const homeController = require('../controllers/home-controller');
const router = express.Router();

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));

module.exports = router;