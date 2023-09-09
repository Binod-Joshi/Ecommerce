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

router.post("/login", async(req,res) => {
    const {email,password} = req.body;
    try {
        if(req.body.email && req.body.password){
            let user = await User.findOne({email});
            if(user){
                let validated = await bcrypt.compare(password,user.password);
                if(validated){
                    res.send({
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                    })
                }else{
                    res.send({message:"Invalid password."})
                }
            }else{
                res.send({message:"Email doesn't exist."})
            }
        }else{
            res.send({message:"Email and password are required"});
        }
    } catch (error) {
        res.send({message:error})
    }
})


module.exports = router;