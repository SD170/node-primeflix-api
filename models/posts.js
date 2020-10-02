const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    authorId:{
        type:String,
        required:true
    },
    title:{
        type: String,
        required: true,
        max: 100
    },    
    content:{
        type: String,
        required: true,
    },
    like:{
        type: Number,
        default:0,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

// const postModel = mongoose.model('post',postSchema);
//export the postSchema..not the model 

module.exports = postSchema
