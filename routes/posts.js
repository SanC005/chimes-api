const express = require('express')
const router = express.Router();


const {getAllPosts,addPost,deletePost,getPost,updatePost} = require('../controllers/posts')


router.route('/').get(getAllPosts)

module.exports = router