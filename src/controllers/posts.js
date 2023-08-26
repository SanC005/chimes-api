const Post = require("../model/postModel");

const getAllPosts = async (req, res) => {
  // try {
  const posts = await Post.find({});
  res.status(201).json({ posts });
  // }
  // catch (error) {
  // res.status(500).json({ msg: error });
  // }
};
const addPost = async (req, res) => {
  // res.json(req.body)

  const post = await Post.create(req.body);
  res.status(201).send({ post });
};
const getPost = async (req, res) => {
  const { id: PostID } = req.params;
  const post = await Post.findOne({ id: PostID });
  if (!post) {
    return res.status(404).json({ msg: `No post found with id : ${PostID}` });
  }
  res.status(201).json({ post });
};
const updatePost = async (req, res) => {
  const { id: PostID } = req.params;
  const post = await Post.findOneAndUpdate({ id: PostID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return res.status(404).json({ msg: `No post found with id : ${PostID}` });
  }
  res.status(201).json({ post });
};
const deletePost = async (req, res) => {
  const { id: PostID } = req.params;
  const post = await Post.findOneAndDelete({ id: PostID });
  if (!post) {
    return res.status(404).json({ msg: `No post found with id : ${PostID}` });
  }
  res.status(201).json({ post });
};
const getPrivate = async (req, res) => {
  const posts = await Post.find({ visibility: false });
  res.status(201).json({ posts });
};
const getPublic = async (req, res) => {
  const posts = await Post.find({ visibility: true });
  res.status(201).json({ posts });
};
const getBookmark = async (req, res) => {
  const posts = await Post.find({ bookmark: true });
  res.status(201).json({ posts });
};
const getLiked = async (req, res) => {
  const posts = await Post.find({ like: true });
  res.status(201).json({ posts });
};

module.exports = {
  getAllPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
  getPrivate,
  getPublic,
  getBookmark,
  getLiked,
};
