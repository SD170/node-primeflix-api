const router = require('express').Router();
const userModel = require('../models/user');
const bcrypt = require('bcryptjs'); //for password hashing
const jwt = require('jsonwebtoken');   //to use token in a login session 


const {registerValidation, loginValidation} = require('../validation');



router.post('/register', async (req,res)=>{
    
    //validating user data
    const {error} = registerValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    //check if user alrady exists
    const emailExists = await userModel.findOne({email : req.body.email});

    if (emailExists)
        return res.status(403).send('Email already Exists');
    
    //hash the password -installed bcryptjs....now generate a "salt".

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //crearting an empty new user data based on User model
    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    //saving to db
    try{
        const savedUser = await user.save();
        res.send({_id: savedUser._id, username: savedUser.username});
    }catch(err){
        res.status(400).send(err);
    }

});


router.post('/login',async (req,res)=>{

    //validating user data
    const {error} = loginValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    //check if user email alrady exists
    const thatUserRow = await userModel.findOne({email : req.body.email});

    if (!thatUserRow)
        return res.status(403).send(`"message" : "Email or password is wrong"`);
    
    //check is password is correct
    const validPass = await bcrypt.compare(req.body.password, thatUserRow.password);
    if(!validPass)
        return res.status(400).send(`"message" : "Email or password is wrong"`)
    
    const token = jwt.sign({_id: thatUserRow._id},process.env.TOKEN_SECRET)  
    //in the frntend we can access the id of the usr, the token is in .env 
    //after creation add token to the header.we can use any name [auth-token]
    res.header('auth-token',token).send(`"message" : "hi,${thatUserRow.username}. You're logged in.${req.user}"`);
    
    // res.send(`"message" : "hi,${thatUserRow.username}. You're logged in."`);

});

module.exports = router;
