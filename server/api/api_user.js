const express = require("express");
const router = express.Router();



router.get("/",(req,res)=>{


    res.json({msg:"YAY! The Api Route is working"});
})



module.exports = router;