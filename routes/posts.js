const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts-controller');

router.get('/create-post',postController.post);


module.exports = router;