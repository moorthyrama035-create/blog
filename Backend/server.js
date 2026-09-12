const express=require("express");
const mongoose=require("mongoose");
const app=express();
const PostRoutes=require("./Routes/posts");
const cors=require("cors");
require("dotenv").config();
app.use(cors());
const upload=require("./middleware/upload")
const CategoryRoutes=require("./Routes/category");
const RegisterRoute=require("./Routes/Register")
const LoginRoutes=require("./Routes/Login")
const PORT=process.env.PORT ||3000;
const authenticationmiddleare=require("./authmiddleware")
app.use(express.json())
console.log("MONGO_URI exists:",!!process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI).then(()=>{
       console.log("database connected");
}).catch((err)=>{
       console.log(err);    
       console.log("database has not connected");
})
app.listen(PORT,()=>{
         console.log("server running on PORT",PORT);         
});
app.use(express.json());
app.use("/api/posts",authenticationmiddleare,upload.single("image"),PostRoutes);
app.use("/api/category",authenticationmiddleare,CategoryRoutes)
app.use("/api/Register",RegisterRoute)
app.use("/api/Login",LoginRoutes)

