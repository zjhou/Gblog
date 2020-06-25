const Blog = require('../backyard/blog');
const blog = new Blog();

module.exports = async (req, res) => {
  const posts = await blog.getPosts();
  res.json(posts).status(200);
};
