var express = require("express");
var app = express();
var Razorpay=require("razorpay");


//creating an instance for the loccal payment

let instance = new Razorpay({
  key_id: 'rzp_test_oqvaAC8nB9YJdH', // your `KEY_ID`
  key_secret: 'CJphqKxnSWwSM9AxAM9BuwYk' // your `KEY_SECRET`
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

app.post("/api/payment/verify",(req,res)=>{
body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
var crypto = require("crypto");
var expectedSignature = crypto.createHmac('sha256', '<key-secret>')
                                .update(body.toString())
                                .digest('hex');
                                console.log("sig"+req.body.razorpay_signature);
                                console.log("sig"+expectedSignature);
var response = {"status":"failure"}
if(expectedSignature === req.body.razorpay_signature)
 response={"status":"success"}
    res.send(response);
});


