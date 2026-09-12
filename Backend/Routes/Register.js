const express=require("express");
const Routes=express.Router()
const authmodel=require("../models/authenticationmodel")
const bycrpt=require("bcrypt")
Routes.post("/",async(req,res)=>{
        try{
                   if(req.body.password!==req.body.Cpassword){
                             return res.status(400).send({"message":"password does'nt match"})
                   }
                  const salt= await bycrpt.genSalt(10);
                  const hash=  await bycrpt.hash(req.body.password,salt)
                   
                  const doc= await authmodel({
                       name:req.body.name,
                       email:req.body.email,
                       password:hash
                   })
                
                 await  doc.save()

                 res.status(201).send({"message":"user Registered successfully"})
        }
        catch(err){
                res.status(409).send({"message":"user already exits"})
        }
})
module.exports=Routes
