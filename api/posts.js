const cors = require('micro-cors')();
const Blog = require('../backyard/blog');
const blog = new Blog();

const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }
  const posts = await blog.getPosts();
  res.json(posts).status(200);
};

module.exports = cors(handler);
