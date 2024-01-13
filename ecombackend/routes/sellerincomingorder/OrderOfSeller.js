const router = require("express").Router();
const mongoose = require("mongoose");
const Ordered = require("../../models/Ordered");
const Cart = require("../../models/Cart");
const moment = require('moment');

router.get("/getnooforderofseller/:id/:status", async (req, res) => {
    try {
      const id = req?.params?.id;
      const status = req?.params?.status;
      const sellerId = new mongoose.Types.ObjectId(id);

      let matchStage;
      if (status === "delivered") {
        matchStage = {
          "orderedProducts.seller": sellerId,
          "orderedProducts.status": "delivered",
          "orderedProducts.cancelled": false,
        };
      } else if (status === "ongoing") {
        matchStage = {
          "orderedProducts.seller": sellerId,
          "orderedProducts.cancelled": false,
          $or: [
            { "orderedProducts.status": "processing" },
            { "orderedProducts.status": "shipped" },
          ],
        };
      } else if (status === "cancelled") {
        matchStage = {
          "orderedProducts.seller": sellerId,
          "orderedProducts.cancelled": true,
        };
      }else if (status == "lastweek"){
        const startOfWeek = moment().subtract(1, 'weeks').startOf('isoWeek').toDate();
        const endOfWeek = moment().subtract(1, 'weeks').endOf('isoWeek').toDate();
        matchStage = {
        "orderedProducts.seller": sellerId,
        "orderedProducts.status": "delivered",
        "orderedProducts.cancelled": false,
        updatedAt: { $gte: startOfWeek, $lte: endOfWeek },
      };
      }
  

      let result = await Ordered.aggregate([
        {
          $unwind: "$orderedProducts",
        },
        {
          $match: matchStage,
        },
        {
          $group: {
            _id: "$orderedProducts.seller",
            productCount: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            sellerId: "$_id",
            productCount: 1,
          },
        },
      ]);
      result = result.length > 0 ? result[0].productCount : 0;
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  
// find the all card much matches product.seller":sellerId

router.get(`/numberofproductaddedtocartforseller/:id`, async (req, res) => {
  try {
    const id = req?.params?.id;
    const sellerId = new mongoose.Types.ObjectId(id);

    let result = await Cart.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $match: {
          "productInfo.seller": sellerId,
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customerInfo",
        },
      },
      {
        $unwind: "$customerInfo", // Unwind the customerInfo array
      },
      {
        $project: {
          customerId: "$customer",
          productId: "$productInfo._id",
          customerName: "$customerInfo.name",
          productName: "$productInfo.name",
          productCategory: "$productInfo.category",
          productImage: "$productInfo.image",
          productQuantity: "$quantity",
          productCost: "$productInfo.cost",
          productDiscount: "$productInfo.discount",
        },
      },
    ]);

    res.json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const gettingOrderedDetails = async (id, status, role) => {
  try {
    const Id = new mongoose.Types.ObjectId(id);
    let matchStage;
    let conditionchecker;
    if(role === "Seller"){
      conditionchecker = "orderedProducts.seller"
    }else{
      conditionchecker = "buyer"
    }

    if (status === "cancelled") {
      matchStage = {
        [conditionchecker]: Id,
        "orderedProducts.cancelled": true,
      };
    } else {
      matchStage = {
        [conditionchecker]: Id,
        "orderedProducts.status": status,
        "orderedProducts.cancelled": false,
      };
    }
    

    let result = await Ordered.aggregate([
      {
        $unwind: "$orderedProducts",
      },
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: "$_id",
          order_id: { $first: "$order_id" },
          buyer: { $first: "$buyer" },
          shippingData: { $first: "$shippingData" },
          orderedProducts: { $push: "$orderedProducts" },
          paymentInfo: { $first: "$paymentInfo" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          __v: { $first: "$__v" },
          group: { $first: "$group" },
        },
      },
      {
        $project: {
          _id: 1,
          order_id: 1,
          buyer: 1,
          shippingData: 1,
          orderedProducts: 1,
          paymentInfo: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          group: 1, // Include the group field in the projection
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    result = await Ordered.populate(result, [
      { path: "orderedProducts.product", model: "Product" },
      { path: "shippingData", model: "ShippingAddress" },
      { path: "buyer", model: "Customer", select: "name _id" },
    ]);

    return result || [];
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};



// here i want to find the ordereds of the particular seller
router.get("/getordereddetailsofseller/:id/:status", async (req, res) => {
  try {
    const id = req?.params?.id;
    const status = req?.params?.status;
    const result = await gettingOrderedDetails(id, status,"Seller");
    res.json(result || []); // Send the response to the client
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


  // for buyer
  router.get(`/getordereddetailsofcustomer/:id/:status`, async(req, res) => {
    try {
      const id = req?.params?.id;
      const status = req?.params?.status;
      const result = await gettingOrderedDetails(id, status,"Customer");
      res.json(result || []); // Send the response to the client
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  

router.put(`/updatestatus`, async (req, res) => {
    try {
      const { status, orderedid, productid } = req.body;
      console.log(status, orderedid, productid);
      const prodid = new mongoose.Types.ObjectId(productid);
      // Find the order that matches the given order_id
      let result = await Ordered.findOne({ order_id: orderedid });
  
      if (result) {
        // Check each ordered product in the order
        result.orderedProducts.forEach((orderedProduct) => {
          if (orderedProduct.product.equals(prodid)) {
            // If the product matches, update its status
            if(status === "true" || status === "false"){
                if(status === "true"){
                    orderedProduct.cancelled = true;
                }else{
                    orderedProduct.cancelled = false;
                }
                
            }else{
                orderedProduct.status = status;
            }
          }
        });
  
        // Save the updated order
        await result.save();
  
        res.status(200).json({ message: "Status updated successfully" });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


module.exports = router;

