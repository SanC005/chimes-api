const Post = require('../model/postModel')

const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.find({})
        res.status(201).json({posts})

    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const addPost = async(req,res) => {
    // res.json(req.body)
    try{
        const post = await Post.create(req.body)
    res.status(201).send({post})
    }catch(error){
        res.status(500).json({msg:error})
    }
    
}
const getPost = async(req,res) => {
    try {
        const {id:PostID} = req.params
        const post = await Post.findOne({_id:PostID})
        if(!post){
            return res.status(404).json({msg:`No post found with id : ${PostID}`})
        }
        res.status(201).json({post})

    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const updatePost = (req,res) => {
    res.send("update a post")
}
const deletePost = async(req,res) => {
    try {
        const {id:PostID} = req.params
        const post = await Post.findOneAndDelete({_id:PostID})
        if(!post){
            return res.status(404).json({msg:`No post found with id : ${PostID}`})
        }
        res.status(201).json({post})

    } catch (error) {
        res.status(500).json({msg:error})
    }
}


module.exports = {
    getAllPosts,getPost,addPost,deletePost,updatePost
}