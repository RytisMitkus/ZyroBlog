const express = require('express')

const router = express.Router()

// eslint-disable-next-line no-unused-vars
const { protect, admin } = require('../middleware/authMiddleware')
const {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPosts,
  getBlogPostById,
  getBlogPostsByAuthor,
} = require('../controllers/blogController')

router.route('/')
  .get(getBlogPosts)
  .post(protect, createBlogPost)
  .delete(protect, deleteBlogPost)

router.route('/post/:id')
  .get(getBlogPostById)

router.route('/posts/author/:id')
  .get(getBlogPostsByAuthor)

router.route('/update')
  .put(protect, updateBlogPost)

module.exports = router
