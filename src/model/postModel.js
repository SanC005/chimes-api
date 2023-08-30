const mongoose = require('mongoose');
// import { Schema, model } from 'mongoose';

const postSchema = new mongoose.Schema({
    temp_id: {
        type:String,
        required:[true,'id is required field'],
        trim:true,
    },
    title: {
        type:String,
        // required:[true,'id is required field'],
        default: "no title",
        trim:true,
    },
    postTitle: {
        type:String,
        // required:[true,'id is required field'],
        default: "no post-title",
        trim:true,
    },
    img: {
        type:String,
        // required:[true,'id is required field'],
        default: "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
        trim:true,
    },
    link: {
        type:String,
        required:[true,'link is required field'],
        trim:true,
    },
    visibility:{
        type:Boolean,
        // required:[true,'visibility is required field'],
        default: false,
    },
    bookmark:{
        type:Boolean,
        // required:[true,'bookmark is required field'],
        default: false,
    },
    like:{
        type:Boolean,
        // required:[true,'bookmark is required field'],
        default: false,
    },
    totalLikes:{
        type:Number,
        default: 0,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        //enum:['ikea',...]
        ref:'User',
        required:[true,'Please provide user']
    },
    // createdAt:{
    //     type:Date,
    //     default: Date.now()
    // },
    
    
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema);
// export default model('Post',postSchema);