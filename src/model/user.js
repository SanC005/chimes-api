const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        // required:[true,'Please provide username'],
        default: 'USER_NAME',
        minlength: 3,
        maxlength: 25,
    },
    email:{
        type:String,
        // required:[true,'Please provide email address'],
        default: 'Email@gmail.com',
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide vaild email'],
        unique:true,
    },
    password:{
        type:String,
        // required:[true,'Please provide password'],
        default: 'Password',
        minlength: 3,

    },
})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
UserSchema.methods.createJWT = function(){
    return jwt.sign({id:this._id,username:this.username,email:this.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
UserSchema.methods.checkPassword = async function(candidatePasssword){
    const isMatch = await bcrypt.compare(candidatePasssword,this.password)
    return isMatch
}
module.exports = mongoose.model('User',UserSchema)