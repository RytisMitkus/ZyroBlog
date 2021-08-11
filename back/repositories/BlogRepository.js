/* eslint-disable no-return-await */
const db = require('../mysql/db')

async function insertNewBlogPost(blogPost) {
  return (await db.query('INSERT INTO post SET ?', [blogPost]))
}

async function updateBlogPost(blogPost) {
  return (await db.query('UPDATE post SET ? WHERE id = ? AND authorId = ?', [blogPost, blogPost.id, blogPost.authorId]))
}
async function deleteBlogPost(blogPost) {
  return (await db.query('DELETE FROM post WHERE id = ? AND authorId = ?', [blogPost.id, blogPost.authorId]))
}

async function getBlogPostById(id) {
  return (await db.query('SELECT * FROM post WHERE id = ?', [id]))
}

async function getBlogPostByAuthorId(authorId) {
  return (await db.query('SELECT * FROM post WHERE authorId = ?', [authorId]))
}

async function getBlogPosts() {
  return (await db.query('SELECT * FROM post'))
}

module.exports = {
  insertNewBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getBlogPostByAuthorId,
  getBlogPosts,
}
