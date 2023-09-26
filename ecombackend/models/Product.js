const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        requied:true,
    },
    rate:{
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
    Description:{
        type:String,
        requied:true,
    }
},
{
    timestamps:true,
});

module.exports = mongoose.model("Product",productSchema);