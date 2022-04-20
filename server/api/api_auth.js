const express = require("express");
const {body, validationResult} = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("express-flash");
const router = express.Router();
const {v4: uuidv4} = require("uuid");
const AuthErrors = require("../messages/errorMessages");
const {beginHashOperation} = require("../util/hashpass");
const {databaseConnector, insertUser, findUser} = require("../util/database_operations");

router.get("/", (req,res)=>{
    res.json({msg:"YAY! auth api is working"});
})

router.post("/register",
body("email").notEmpty().exists({checkNull:true,checkFalsy:true}).isEmail().withMessage({AuthenticationError:AuthErrors.email_Format_Incorrect}).normalizeEmail().bail(),
body("username").notEmpty().exists({checkNull:true, checkFalsy:true}).isLength("4").withMessage({AuthenticationError:AuthErrors.username_Length_Error}).bail(),
body("password").notEmpty().exists({checkNull:true, checkFalsy:true}).isLength("4").withMessage({AuthenticationError:AuthErrors.password_Length_Error}).bail(),
body("password").custom((value, {req}) => value === req.body.cPassword).withMessage({AuthenticationError:AuthErrors.password_Confirm_Mismatch}).bail(),
(req,res)=>{
    const {username,email,password} = req.body;
    databaseConnector((connector)=>{
        findUser(connector,email,(result)=>{
            if(result.length > 0){
                res.send({msg:"That email is already associated with an account. Please Login or Reset Your password."})
            }
            insertUser(connector,uuidv4(),username, email, beginHashOperation(password),(result)=>{
                res.send({msg:result, RegisteredSuccessfully:"Account Successfully Registered, You can now login."});
            });
        })
    })


})

module.exports = router;