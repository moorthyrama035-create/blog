const express=require("express");
const Routes=express.Router();
const usermodel=require("../models/authenticationmodel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

Routes.post("/",async(req,res)=>{  
       const data= await usermodel.findOne({email:req.body.email});
       
       if(!data){
         res.status(400).send({"message":"invalid credentials"})
       }
        const isMatch=await bcrypt.compare(req.body.password,data.password);
        console.log(isMatch);      
        if(!isMatch){
           return res.status(400).send({"message":"Invalid credentials"});
        }
      const Token=  jwt.sign({payload:data._id},process.env.JWT_SECRET,{expiresIn:"4h"});
        res.status(200).send({
            "message":"valid credentials",
             token:Token
        });
}
)
module.exports=Routes;
