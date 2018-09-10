const mongoose = require('mongoose');

const movie = require('./movie');

const rentSchema = new mongoose.Schema({
    client_id: {type: String, required:[true,'NO_CLIENT_ID']},
    date: {type: Date, default: Date.now},
    payment_type: {type: String, enum:['Cash','Credit_Card'], required:[true,'NO_PAYMENT']},
    shipping_type: {type: String, enum:['PickUp','Shipping'], required:[true,'NO_SHIPPING']},
    total: {type: Number, required:[true, 'NO_TOTAL']},
    detail: [{type:mongoose.Schema.Types.ObjectId, ref:'movies'}]
});

module.exports = mongoose.model('rent', rentSchema);