const mongoose = require('mongoose');

const postSchema = require('./posts');
//Create Schema and Model
// const userSchema = new mongoose.Schema({
    // username: String,
    // email: String,
    // password: String,
// })
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min:6,
    },
    date:{
        type: Date,
        default: Date.now
    },
    posts:[postSchema],
})

    //model/collection name = usermodel
const userModel = mongoose.model('user',userSchema);
//the line above means every time a new user creates...we'll keep it in a name 'usermodel' and i'll be based on userSchema

module.exports = userModel;