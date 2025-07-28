const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register",async(req,res)=>{
        
    const newuser = new User({name:req.body.name,email:req.body.email,password:req.body.password})

    try{
        const user = await newuser.save()
        res.send('User Registered successfully')   
     }
     catch (error) {
        console.error("Error fetching rooms:", error);
        return res.status(400).json({ message: error });
    }



});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email, password: password });
        if (user) {
            res.send(user);
        } else {
            return res.status(400).json({ message: 'Login Failed' });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(400).json({ message: error });
    }
});

router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deleteuser", async(req, res) => {
  
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});


router.get("/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking user existence:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router