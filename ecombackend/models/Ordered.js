const mongoose = require("mongoose");

const orderedSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shippingData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingAddress",
      required: true,
    },
    orderedProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Seller",
          required: true,
        },
        status: {
          type: String,
          enum: ["processing", "shipped", "delivered"],
          default: "processing",
        },
        cancelled: {
          type: Boolean,
          required:true,
        },
      },
    ],
    paymentInfo: {
      type: Number,
      required: true,
    },
    group: {
      type: Boolean,
      required:true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ordered", orderedSchema);
