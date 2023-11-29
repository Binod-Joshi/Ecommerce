const router = require("express").Router();
const ShippingAddress = require("../../models/ShippingAddress");

router.post("/addupdateshippingdata",async(req,res) => {
    try {
        const {
            address,
            city,
            state,
            country,
            pinCode,
            phoneNo,
            customer,
        } = req.body;
        console.log(address,
            city,
            state,
            country,
            pinCode,
            phoneNo,
            customer,);

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

router.get("/gettingshippingdata/:id", async(req,res) => {
    try {
        const id = req?.params?.id;
        console.log("getting",id)
        const result = await ShippingAddress.findOne({customer:id});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;