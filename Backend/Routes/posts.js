const express = require("express");
const Routes = express.Router();
const postmodel = require("../models/postmodel");
const categorymodel=require("../models/categorymodel")
Routes.post("/", async (req, res) => {  
  try {
    const category=await categorymodel.findOne({name:req.body.category});
    let categoryId;
    if(!category){
      const categoryname=new categorymodel({
        name:req.body.category
      })
      await categoryname.save()
      categoryId=categoryname._id
    }  
    else{
        categoryId=category._id
    } 
      const doc = new postmodel({
             title:req.body.title,
             description:req.body.description,
             category:categoryId,
             image:req.file?req.file.path :null,
             author:req.user
       });
       await doc.save();
       console.log(doc);    
      res.status(201).json(doc);
    } 
    
  catch (error) {
    res.status(400).send({ message: error.message });
  }

});

Routes.get("/", async (req, res) => {
  try {
       let totalpage=await postmodel.countDocuments()
       const {page,limit}=req.query 
       totalpage=Math.ceil(totalpage/limit)
       console.log(totalpage);
       let skip=(page-1)*limit
       console.log(skip);
       
       const data = await postmodel.find({}).populate("author").skip(skip).limit(limit)
       console.log(data);
       
       res.status(200).json({
        data,
        totalpage,
        currentpage:page
      }
      );
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
Routes.get("/:id", async (req, res) => {
  try {
    const {id }= req.params;
    console.log(id); 
    const data = await postmodel.findById(id).populate(["category","author"])
    console.log(data);    
    if (!data) {
      res.status(404).send({ message: "data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).send({ message:error.message});
  }
});
Routes.put("/:id", async (req, res) => {
  try {
    let categoryid;
    const doc=await categorymodel.findOne({name: req.body.category})  
    console.log(doc);
  
    if(!doc){
      const newcategory= categorymodel({
        name:req.body.category
      })
      await newcategory.save()
      console.log(newcategory);   
      categoryid=newcategory._id;
      console.log(categoryid);
      
    }
    else{
       
      categoryid=doc._id 
    }
   console.log(categoryid);
   

    const {id }= req.params;
    const updateddata = await postmodel.findByIdAndUpdate(id,{
        title:req.body.title,
        description:req.body.description,
        category:categoryid
    },{new :true})
    if (!updateddata) {
      res.status(400).send({ message: "bad request" });
    }
    res.status(200).json(updateddata);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});
Routes.delete("/:id", async (req, res) => {
  try {
    const {id }= req.params;
    await postmodel.findByIdAndDelete(id);
    res.status(200).send({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
    
module.exports = Routes;
