const router = require('express').Router();
const {postCreationValidation} = require('../validation');
const userModel = require('../models/user');
const {postModel} = require('../models/posts');
const {authenticate} = require('../vetifyToken');   //to make the route private


router.get('/',authenticate,async (req,res)=>{
    


    //we have the logged in user's info
    userId = req.user._id;
    // const userInfo = await userModel.findOne({_id:userId});
    const posts = await postModel.find();
    res.json(posts)

})

router.post('/', authenticate,async (req,res)=>{
    const {error} = postCreationValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    const modelObj = {
        authorId: req.user._id, title: req.body.title, content: req.body.content
    }
    
    const newPostModel = await new postModel(modelObj);


    const newUserPosts = await userModel.findOneAndUpdate({_id : newPostModel.authorId},    
        {
        $push: {
            posts: {
                $each:[{postId:newPostModel._id}],
                $position:0,
        }
    }}
    );

    
    try{
        const newPostModelSave = await newPostModel.save();
        const savedUserPosts = await newUserPosts.save();
        await res.json({
            _id: newPostModelSave._id,
            authorId: newPostModelSave.authorId,
            title: newPostModelSave.title,
            content: newPostModelSave.content,
            createdAt: newPostModelSave.createdAt
        });
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router