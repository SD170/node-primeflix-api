const router = require('express').Router();
const {paymentModel} = require('../models/payments');
const {authenticate} = require('../vetifyToken');   //to make the route private


router.get('/list',authenticate,async (req,res)=>{
    //we have the logged in user's info
    userId = req.user._id;
    // const userInfo = await userModel.findOne({_id:userId});
    const payments = await paymentModel.find();
    res.json(payments);
})

module.exports = router;