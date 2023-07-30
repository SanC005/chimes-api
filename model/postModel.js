const mongoose = require('mongoose');
// import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    id: {
        type:Number,
        required:[true,'id si required field']
    },
    title: String,
    img: String,
    postTitle: String,
    link: String
})

module.exports = mongoose.model('Post',postSchema);
// export default model('Post',postSchema);