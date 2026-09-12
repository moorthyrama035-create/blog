const express=require("express");
const Routes=express.Router()
const postmodel = require("../models/postmodel");
const categorymodel=require("../models/categorymodel")
Routes.get("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
        return  res.status(400).send({"message":"bad request"})
        }
        const categoryposts= await postmodel.find({category:id}).populate(["category","author"]);
        res.status(200).json(categoryposts);
    } catch (error) {
          res.status(400).send({"message":error.message})
    }  
})
Routes.get("/",async(req,res)=>{
           try {
             const data=   await  categorymodel.find({})
              res.status(200).json(data)
           } catch (error) {
                res.status(500).send({"message":error.message})
           }
}
)
module.exports=Routes
