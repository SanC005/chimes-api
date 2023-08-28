const customError = require('../errors/customError')
const jwt = require('jsonwebtoken')
const login = async(req,res) =>{
    const {username,password} = req.body
    if(!username || !password){
        throw new customError("Please provide username and password",400)
    }
    const id = new Date().getDate()
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    console.log(username,password)
    res.status(200).json({msg:'user created',token})
}
const dashboard = async(req,res) => {
    const num = Math.floor(Math.random()*100)
    return res.status(200).json({msg:`login details recieved!`,secret:`your number is ${num}`})
}
module.exports = {login,dashboard}