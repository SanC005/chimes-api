const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const {StatusCodes} = require('http-status-codes')
var bcrypt = require('bcryptjs')
const login = async(req,res) =>{
    const {username,password} = req.body
    if(!username || !password){
        throw new BadRequestError("Please provide username and password")
    }
    const id = new Date().getDate()
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    console.log(username,password)
    res.status(200).json({msg:'user created',token})
}
const dashboard = async(req,res) => {
    
    const num = Math.floor(Math.random()*100)
    return res.status(200).json({msg:`login details recieved! Welcome ${req.user.username}!`,secret:`your number is ${num}`})

}
const register = async(req,res) =>{
    console.log('registering...')
    const user = await User.create({ ...req.body}) 
    const token = user.createJWT()
    return res.status(StatusCodes.CREATED).json({ user:{username:user.username,email:user.email},token})
}
module.exports = {login,dashboard,register}