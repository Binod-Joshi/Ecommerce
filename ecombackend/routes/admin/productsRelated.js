const router = require("express").Router();
const Cart = require("../../models/Cart");
const Ordered = require("../../models/Ordered");
const Product = require("../../models/Product");

router.post("/addproduct", async (req, res) => {
    const { name, cost, id, discount, category, image, quantity, description } = req.body;
    try {
        let product = new Product({
            name,
            cost,
            seller: id, // Assign the id directly to the seller field
            discount,
            category,
            image,
            quantity,
            description
        });

        const productExist = await Product.findOne({ name });

        if (productExist) {
            res.send({ message: "Product already exists." });
        } else {

            product = await product.save();
            res.status(200).send({
                _id: product._id,
                name: product.name,
                cost: product.cost,
                discount: product.discount,
                category: product.category,
                quantity: product.quantity,
                seller: product.seller,
                image: product.image,
                description: product.description,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;


// for getting allproductdetails
router.get("/getproducts",async(req,res) => {

    try {
        const results = await Product.find();
        res.status(200).send(results);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// for particular product
router.post("/getparticularproduct", async (req, res) => {
    try {
        const productId = req.body.productId;
        let result = await Product.findById(productId);
        res.send({
            _id: result._id,
            name: result.name,
            cost: result.cost,
            discount: result.discount,
            category: result.category,
            quantity:result.quantity,
            description:result.description,
            seller: result.seller,
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json(error); 
    }
});

// for searched products
router.post("/getsearchedrproduct", async(req, res) => {
    try {
        const category = req.body.key;
        let result = await Product.find({category:category});
       if(result?.length>0){
            res.status(200).send(result);
        }else{
            res.status(200).send({message:"No Product Found."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

//for searches products
router.post("/getSearchesproduct", async(req,res) => {
    try {
        const searchedKey = req.body.key;
        let result = await Product.find({
            $or: [
                {name: { $regex: searchedKey,$options: 'i'}},
                {category: {$regex: searchedKey,$options: 'i'}},
            ]
        });
        if(result?.length>0){
            res.status(200).send(result);
        }else{
            res.status(200).send({message:"No Product Found."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

// to store the product to the cart.

router.post("/savetocart", async(req,res) => {
    const {customer,product,quantity} = req.body.fields;
    try {
        let result = new Cart({
            customer,
            product,
            quantity,
        });

        result = await result.save();
        if(result?.customer){
            res.status(200).send({message:"Successfully added to the cart."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})


// for getting products of cart
router.get("/getcartproducts/:id", async(req,res) => {
    const customer = req.params.id;
    try {
        // only send the porduct related to the that customer.
        let result = await Cart
        .find({customer:customer})
        .populate({ path: 'customer', select: 'name' }) // Populate only the 'name' field of the 'customer'
        .populate('product');
        
        if(result){
            res.status(200).send(result)
        }else{
            res.send({message:"Failed to fetch the data of the cart."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

// for updating the quantity of the product in the cart.
router.post("/updatingquantityofproductincart", async(req,res) => {
    try {
        const {id,quantity} = req.body;
        let result = await Cart.findByIdAndUpdate(id,
            {$set:{quantity:quantity}},
            {new: true});

            if(result?.quantity){
                res.status(200).send({message:"quantity updated successfully."})
            }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// for removing porduct from the cart
router.put("/removeproductfromCart/:id", async(req,res) => {
    try {
        const id = req.params.id;
        let result = await Cart.findOneAndDelete({_id:id});
        if (result?._id) {
            res.status(200).send({ message: "Product is successfully removed." });
        } else {
            res.status(404).send({ message: "Product not found." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


// getting ordered product
router.post("/settingOrderedProduct", async(req,res) => {
    try {
        const {id} = req.body;
        let result = await Ordered.create({ordered:id});
        result = await Ordered.findById(result._id).populate("ordered");
        if(result._id){
            res.status(200).send({message : "order is placed"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});