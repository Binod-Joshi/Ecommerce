const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        requied:true,
    },
    cost:{
        type:Number,
        requied:true,
    },
    discount:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        requied:true,
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    }
},
{
    timestamps:true,
});

module.exports = mongoose.model("Product",productSchema);