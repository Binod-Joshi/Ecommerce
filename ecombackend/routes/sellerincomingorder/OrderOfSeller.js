const router = require("express").Router();
const mongoose = require('mongoose');
const Ordered = require("../../models/Ordered");
const Cart = require("../../models/Cart");

router.get("/getnooforderofseller/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const sellerId = new mongoose.Types.ObjectId(id);

        let result = await Ordered.aggregate([
            {
                $unwind: "$orderedProducts" // Unwind the orderedProducts array
            },
            {
                $group: {
                    _id: "$orderedProducts.seller",
                    productCount: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$orderedProducts.seller", sellerId] },
                                then: 1,
                                else: 0
                            }
                        }
                    }
                }
            },
            {
                $match: { _id: sellerId }
            },
            {
                $project: {
                    _id: 0, // Exclude _id field from the result
                    sellerId: "$_id",
                    productCount: 1
                }
            }
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
                    from: 'products', // Replace with the actual name of your Product collection
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productInfo'
                }
            },
            {
                $match: {
                    'productInfo.seller': sellerId
                }
            },
            {
                $unwind: '$productInfo'
            },
            {
                $project: {
                    'customerId': '$customer',
                    'productId': '$productInfo._id',
                    'name': '$productInfo.name',
                    'category': '$productInfo.category',
                    'image': '$productInfo.image',
                    'quantity': '$quantity',
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// here i want to find the ordereds of the particular seller
router.get("/getordereddetailsofseller/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const sellerId = new mongoose.Types.ObjectId(id);

        let result = await Ordered.aggregate([
            {
                $unwind: "$orderedProducts"
            },
            {
                $match: {
                    "orderedProducts.seller": sellerId
                }
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
                    __v: { $first: "$__v" }
                }
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
                    __v: 1
                }
                
            },
            {
                $sort: { createdAt: -1 }
            }

        ]);
        result = await Ordered.populate(result, [
            { path: "orderedProducts.product", model: "Product" },
            { path: "shippingData", model: "ShippingAddress" },
            { path: "buyer", model: "Customer",select: "name _id"}
        ]);
        res.json(result || []);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
