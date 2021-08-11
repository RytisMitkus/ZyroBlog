const asyncHandler = require('express-async-handler')
const blogRepository = require('../repositories/BlogRepository')
const blogService = require('../services/BlogService')({
  blogRepository,
})

// @desc    Create blog entry
// @route   POST /api/blog/
// @access  Private
const createBlogPost = asyncHandler(async (req, res) => {
  let blogPost = req.body
  blogPost = { ...blogPost, authorId: req.user.id }
  const test = await blogService.createNewBlogPost(blogPost)
  res.json({
    user: req.user,
    reqBody:
    {
      test,
    },
  })
})

const updateBlogPost = asyncHandler(async (req, res) => {
  let blogPost = req.body
  blogPost = { ...blogPost, authorId: req.user.id }
  console.log(blogPost)
  const test = await blogService.updateBlogPost(blogPost)
  res.json({
    user: req.user,
    reqBody:
    {
      test,
    },
  })
})

const deleteBlogPost = asyncHandler(async (req, res) => {
  let blogPost = req.body
  console.log(blogPost)
  blogPost = { ...blogPost, authorId: req.user.id }
  const test = await blogService.deleteBlogPost(blogPost)
  res.json({
    user: req.user,
    reqBody:
    {
      test,

    },
  })
})

const getBlogPosts = asyncHandler(async (req, res) => {
  const test = await blogService.getBlogPosts()
  res.json({
    test,
  })
})

const getBlogPostById = asyncHandler(async (req, res) => {
  const test = await blogService.getBlogPostById(req.params.id)
  res.json({
    test,
  })
})

const getBlogPostsByAuthor = asyncHandler(async (req, res) => {
  const test = await blogService.getBlogPostsByAuthor(req.params.id)
  res.json({
    test,
  })
})

module.exports = {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPosts,
  getBlogPostById,
  getBlogPostsByAuthor,
}
