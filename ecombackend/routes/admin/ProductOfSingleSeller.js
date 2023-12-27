const router = require("express").Router();
const Product = require("../../models/Product");
const mongoose = require('mongoose');

router.get("/getproduct/:id", async(req,res) => {

    try {
        const id = req.params;
        const sellerId = new mongoose.Types.ObjectId(id);
        let result = await Product.find({ seller: sellerId });
        if(result){
            res.status(200).send(result)
        }else{
            res.send({message:"Failed to fetch the product of the seller."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put("/updatingproduct", async (req, res) => {
    try {
      const { name, cost, discount, description, quantity, productId } = req.body.fields;
  
      // Build the update object, including only non-empty fields
      const updateObject = {};
      if (name !== "") updateObject.name = name;
      if (cost !== "") updateObject.cost = cost;
      if (discount !== "") updateObject.discount = discount;
      if (description !== "") updateObject.description = description;
      if (quantity !== "") updateObject.quantity = quantity;

      const result = await Product.findByIdAndUpdate(
        productId,
        updateObject,
        { new: true } 
      );
  
      if (!result) {
        
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Return the updated product
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

router.post("/removingproduct", async(req,res) => {
    try {
        const id = req.body.id;
        console.log(id);
        let result = await Product.findByIdAndDelete(id);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})



module.exports = router;