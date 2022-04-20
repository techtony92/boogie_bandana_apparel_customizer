const express = require("express");
const router = express.Router();




router.get("/",(req,res)=>{
    res.json({msg:"YAY Products api is working!!"})
})




module.exports = router;