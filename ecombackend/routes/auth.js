const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


router.post('/register', async(req,res) => {
    const {name, email, password} = req.body;
    console.log(email,password);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        let user = new User({
            ...req.body,
            password:hashedPassword,
        });

        const emailExist = await User.findOne({email});

        if(emailExist){
            res.send({message:"email already exist."})
        }else{
            user = await user.save();
            res.status(200).send({
                _id:user._id,
                name:user.name,
                email:user.email,
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;