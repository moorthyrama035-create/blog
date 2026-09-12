const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
      name:{
          type:String,
          required:true
      }
});
const categorymodel=mongoose.model("category",categorySchema);
module.exports=categorymodel

