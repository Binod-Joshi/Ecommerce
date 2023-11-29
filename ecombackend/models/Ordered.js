const mongoose = require("mongoose");

const orderedSchema = new mongoose.Schema({
    ordered:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart", //ref product bate banaun padde ho
        required:true,
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Ordered",orderedSchema);