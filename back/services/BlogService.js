/* eslint-disable no-return-await */
// const createError = require('http-errors')

module.exports = ({
  blogRepository,
}) => ({
  async createNewBlogPost(blogPost) {
    return await blogRepository.insertNewBlogPost(blogPost)
  },
  async updateBlogPost(blogPost) {
    return await blogRepository.updateBlogPost(blogPost)
  },
  async deleteBlogPost(blogPost) {
    return await blogRepository.deleteBlogPost(blogPost)
  },
  async getBlogPostById(blogPostId) {
    return await blogRepository.getBlogPostById(blogPostId)
  },
  async getBlogPosts() {
    return await blogRepository.getBlogPosts()
  },
  async getBlogPostsByAuthor(authorId) {
    return await blogRepository.getBlogPostByAuthorId(authorId)
  },

})
