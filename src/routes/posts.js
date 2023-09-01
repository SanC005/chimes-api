const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  addPost,
  deletePost,
  getPost,
  updatePost,
  getPrivate,
  getPublic,
  getBookmark,
  getLiked,
  getSearch,
  deleteAll,
  getUserPosts,
  getAllPublicPosts
} = require("../controllers/posts");

router.route("/home").get(getUserPosts).post(addPost).delete(deleteAll);
router.route("/search").get(getSearch)
router.route("/home/:id").get(getPost).patch(updatePost).delete(deletePost);
router.route("/private").get(getPrivate);
router.route("/public").get(getPublic);
router.route("/bookmark").get(getBookmark);
router.route("/likes").get(getLiked);
router.route("/feed").get(getAllPublicPosts);
router.route("/all").get(getAllPosts);
module.exports = router;
