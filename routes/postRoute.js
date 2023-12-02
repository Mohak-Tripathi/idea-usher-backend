// posts.routes.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
// const uploadMiddleware = require('../middleware/uploadMiddleware');

router.get('/posts', postsController.getAllPosts);
// router.post('/posts', uploadMiddleware.single('image'), postsController.createPost);
router.post('/post', postsController.createPost);
router.get('/posts/search', postsController.searchPosts);
router.get('/posts/tags', postsController.filterPostsByTags);

module.exports = router;
