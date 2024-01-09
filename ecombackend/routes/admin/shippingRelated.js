const router = require("express").Router();
const Cart = require("../../models/Cart");
const Ordered = require("../../models/Ordered");
const Payment = require("../../models/Payment");
const ShippingAddress = require("../../models/ShippingAddress");
const instance = require("../../razorpayInstance"); // to use import we have to use .mjs extension and we are not able to use require and import in a single file.
const crypto = require("crypto");
const mongoose = require('mongoose');

router.post("/addupdateshippingdata", async (req, res) => {
  try {
    const { address, city, state, country, pinCode, phoneNo, customer } =
      req.body;

    // Check if the shipping address already exists for the customer
    let existingShippingAddress = await ShippingAddress.findOne({
      customer: customer,
    });

    if (existingShippingAddress) {
      // If exists, update the existing document
      existingShippingAddress.address = address;
      existingShippingAddress.city = city;
      existingShippingAddress.state = state;
      existingShippingAddress.country = country;
      existingShippingAddress.pinCode = pinCode;
      existingShippingAddress.phoneNo = phoneNo;

      await existingShippingAddress.save();
      res.status(200).json(existingShippingAddress);
    } else {
      // If not exists, create a new shipping address document
      const newShippingAddress = new ShippingAddress({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
        customer: customer,
      });

      const savedShippingAddress = await newShippingAddress.save();
      res.status(201).json(savedShippingAddress);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/gettingshippingdata/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await ShippingAddress.findOne({ customer: id });
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// for payment process

//getting key
router.get("/getkey", async (req, res) => {
  try {
    res.status(200).send({ key: process.env.RAZORPAY_API_KEY });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ordercreation
router.post("/checkout", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Number(amount * 100), // amount in the smallest currency unit.
      currency: "INR",
    };
    //order create
    const order = await instance.orders.create(options);
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//paymentverification
router.post("/paymentverification", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here
      try {
        await Payment.create({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
         res.redirect(
        `https://fusionfashion.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`
      );
      } catch (error) {
        console.error('Error creating payment:', error);
      }

    } else {
      res.redirect(`https://fusionfashion.netlify.app/paymentfailure`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get('/checkorderid/:order_id',async(req,res) => {
  try {
    const order_Id = req?.params?.order_id;
    let result = await Payment.find({razorpay_order_id:order_Id});
    if(result?.length){
    res.status(200).send({message:"orderId found"});
    }else{
    res.send({message:"orderId not found"});
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({message:error});
  }

});

router.post(`/buyingdetails`, async(req, res) => {
  try {
    const {buyingDetails} = req.body;
    const order_Id = buyingDetails?.order_id;

    let result = await Payment.findOne({razorpay_order_id:order_Id});
    if(result?._id){
      let orderedInstance = new Ordered(buyingDetails);
      await orderedInstance.save();
      res.status(200).send({message:"saved successfully."})
    }else{
      
      res.status(200).json({message:"cheating bro cheating!"});
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).send({message:error});
  }
})

router.put(`/removeproductfromcartafterpayment`, async(req, res) => {
  try {
    const {orderedDetails,length} = req.body;
    const buyerr = orderedDetails?.buyer;
    const buyerid = new mongoose.Types.ObjectId(buyerr);    
    if(length === "morethan1"){

      await Cart.deleteMany({customer:buyerid});

    }else if( length === "1"){
      const productt = orderedDetails?.product;
      const productid = new mongoose.Types.ObjectId(productt);
      await Cart.deleteOne({ $and: [{ customer: buyerid }, { product: productid }] });
    }
    result = await Cart.find({buyer:buyerid});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({message:error});
  }
})

module.exports = router;
