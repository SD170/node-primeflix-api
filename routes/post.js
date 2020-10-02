const router = require('express').Router();
const {postCreationValidation} = require('../validation');
const userModel = require('../models/user');
const {authenticate} = require('../vetifyToken');   //to make the route private

const { verify } = require('jsonwebtoken');

router.get('/',authenticate,async (req,res)=>{
    res.json({posts:{
            title:'First post',
            description:'Random data you should not access'
        }
    });

    //we have the logged in user's info
    userId = req.user._id;
    const userInfo = await userModel.findOne({_id:userId})

})

router.post('/', authenticate,async (req,res)=>{
    const {error} = postCreationValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    // const u = await userModel.findOne({_id:})

    const newPost = await userModel.findOneAndUpdate({_id : req.user._id},    
        {
        $push: {
            posts: {
                $each:[{authorId: req.user._id, title: req.body.title, content: req.body.content}],
                $position:0,
        }
    }}
    );
    
    try{
        const savedNewPost = await newPost.save();
        res.send({ newPostsId: savedNewPost.posts[0]._id, newPost: savedNewPost});
    }catch(err){
        res.status(400).send(err);
    }
    
})

module.exports = router