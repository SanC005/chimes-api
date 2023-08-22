const express = require('express')
const router = express.Router();


const {getAllPosts,addPost,deletePost,getPost,updatePost,getPrivate,getPublic,getBookmark,getLiked} = require('../controllers/posts')


router.route('/home').get(getAllPosts).post(addPost)
router.route('/home/:id').get(getPost).patch(updatePost).delete(deletePost)
router.route('/private').get(getPrivate)
router.route('/public').get(getPublic)
router.route('/bookmark').get(getBookmark)
router.route('/likes').get(getLiked)
module.exports = router