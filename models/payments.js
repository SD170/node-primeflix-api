const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    payment_signature:{
        type:String,
        required:true
    }
})

const paymentModel = mongoose.model('payment',paymentSchema);
//export the postSchema..not the model 

module.exports = {
    'paymentSchema': paymentSchema,
    'paymentModel': paymentModel
}
