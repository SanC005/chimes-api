const Post = require('../model/postModel').default

const getAllPosts = (req,res) => {
    res.send("getting all posts")
}
const addPost = async(req,res) => {
    // res.json(req.body)
    const post = await Post.create(req.body)
    res.status(201).send({post})
}
const getPost = (req,res) => {
    res.json({id: req.params.id})
}
const updatePost = (req,res) => {
    res.send("update a post")
}
const deletePost = (req,res) => {
    res.send("delete a post")
}


module.exports = {
    getAllPosts,getPost,addPost,deletePost,updatePost
}