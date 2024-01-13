const router = require("express").Router();
const Cart = require("../../models/Cart");
const Ordered = require("../../models/Ordered");
const Payment = require("../../models/Payment");
const ShippingAddress = require("../../models/ShippingAddress");
const instance = require("../../razorpayInstance"); // to use import we have to use .mjs extension and we are not able to use require and import in a single file.
const crypto = require("crypto");
const mongoose = require("mongoose");

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
router.post("/paymentverification/:data", async (req, res) => {
  try {
    const data = req?.params?.data;
    console.log(data);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Verify the signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database operations
      try {
        // Convert 'data' to an object if it's a string
        const orderedData =
          typeof data === "string"
            ? JSON.parse(decodeURIComponent(data))
            : data;

        await Payment.create({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });

        let orderedInstance = new Ordered(orderedData);
        await orderedInstance.save();

        // Remove product from cart based on the given conditions
        try {
          const productIdsToRemove = Array.isArray(orderedData.orderedProducts)
            ? orderedData.orderedProducts.map((item) => item.product)
            : [orderedData.orderedProducts.product]; // Create an array with a single element

          await Cart.deleteMany({
            customer: orderedData.buyer,
            product: { $in: productIdsToRemove },
          });

          res.redirect(
            `https://fusionfashion.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`
          );
        } catch (error) {
          res.redirect(`https://fusionfashion.netlify.app`);
        }
      } catch (error) {
        console.error("Error creating payment or ordered instance:", error);
        res.redirect(`https://fusionfashion.netlify.app/paymentfailure`);
      }
    } else {
      res.redirect(`https://fusionfashion.netlify.app/paymentfailure`);
    }
  } catch (error) {
    console.log(error);
    res.redirect(`https://fusionfashion.netlify.app/paymentfailure`);
  }
});

module.exports = router;
