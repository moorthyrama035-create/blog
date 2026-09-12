const mongoose=require("mongoose");
const Postschema=new  mongoose.Schema({
      title:{
           type:String,
           required:true
      },
      description:{
           type:String,
           required:true
      },
      category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"category"
      },
      image:String,  
      author:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"service"
      }
},
{
     timestamps:true
}
)
const Postmodel=mongoose.model("Post",Postschema);
module.exports=Postmodel;
