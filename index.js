const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {paymentModel} = require('./models/payments');


//payment
var Razorpay=require("razorpay");


//cors
const cors = require('cors');
app.use(cors());

//import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

//dotenv - dont have to require in other files.
const dotenv = require('dotenv');
//to acces our .enf file
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//connect to mongo-db
mongoose.connect('mongodb://localhost/primeflix',
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false 
    }
);


//mongoose.conn gives diff info about the conn.....and once is just an event listener
//once eventlistner listens just one time
//on listens each time
mongoose.connection.once('open',()=>{
    console.log('mongo conn made');
}).on('error',(err)=>{
    console.log('Connection error: ',err);
})


//creating Route middlewares
//i.e calling all the routes on auth
app.use('/api/user',authRoute);
    //this means to go to register we have to go to /api/user/register
    //it'll always have this prefix
app.use('/api/posts',postRoute);


//payment
//creating an instance for the loccal payment

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // your `KEY_ID`
    key_secret: process.env.RAZORPAY_KEY_SECRET // your `KEY_SECRET`
  })
  

  app.use('/web', express.static('public'));

  //generating the order ID for the payment instance
  
  app.post("/api/payment/order",(req,res)=>{
  params=req.body;
  instance.orders.create(params).then((data) => {
         res.send({"sub":data,"status":"success"});
  }).catch((error) => {
         res.send({"sub":error,"status":"failed"});
  })
  });
  
  
  //verfiy the params and expected signature here
  //encrypting with HMAC
  
  app.post("/api/payment/verify",async (req,res)=>{
  body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                  .update(body.toString())
                                  .digest('hex');
                                  console.log("sig"+req.body.razorpay_signature);
                                  console.log("sig"+expectedSignature);
  
  const newPayModel = new paymentModel({payment_signature: `sig${req.body.razorpay_signature}`});
  try{
    const newPay = await newPayModel.save();
    // res.send({_id: newPay._id, payment_signature: newPay.payment_signature});
}catch(err){
    res.status(400).send(err);
}

  var response = {"status":"failure"}
  if(expectedSignature === req.body.razorpay_signature)
   response={"status":"success"}
      res.send(response);
  });
  
  
    




app.listen(3700, ()=>{console.log('Server Created at port:3700')});
