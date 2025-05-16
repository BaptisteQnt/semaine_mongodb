const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllers');
const validatePost = require('../middlewares/validatePost');
const auth = require('../middlewares/auth');

// Routes liées aux articles
router.get('/', postController.getAllPosts);
router.get('/new',auth, postController.showCreateForm);
router.post('/new',auth, validatePost, postController.storePost);
router.get('/post/:id', postController.getPostById);

module.exports = router;
