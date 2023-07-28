

const getAllPosts = (req,res) => {
    res.send("getting all posts")
}
const getPost = (req,res) => {
    res.send("getting a single post")
}
const addPost = (req,res) => {
    res.send("add a post")
}
const updatePost = (req,res) => {
    res.send("add a post")
}
const deletePost = (req,res) => {
    res.send("delete a post")
}


module.exports = {
    getAllPosts,getPost,addPost,deletePost,updatePost
}