const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    pinCode: {
        type: Number,
    },
    phoneNo: {
        type: Number,
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required:true,
    }
},
{timestamps:true},
)

module.exports = new mongoose.model("ShippingAddress",shippingSchema);