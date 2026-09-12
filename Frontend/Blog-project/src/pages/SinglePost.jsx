import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {OrbitProgress}  from "react-loading-indicators"
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
const SinglePost = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  console.log(id);
  let [singlepost, setpost] = useState({});
  let [err, seterr] = useState("");
  let [loading,setloading]=useState(true)
  useEffect(() => {
    fetch(`https://mern-stack-blog-production-b5b5.up.railway.app/api/posts/${id}`, { method: "GET" ,
      headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("!something went wrong")

      })
      .then((res) => {
        setpost(res);
      })
      .catch((err) => {
        seterr(err.message);
      })
      .finally(()=>{
            setloading(false)
      })
  }, []);
  function deletehandle() {
    axios
      .delete(`https://mern-stack-blog-production-b5b5.up.railway.app/api/posts/${id}`,{
        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
      })
      .then(() => {
        return Swal.fire({
          title: "Deleted successfully!",
          icon: "success",
        });
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/home");
        }
      });
  }
if(loading){
  return(
    <div>
       <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
    </div>
  )
}
  return (
   <div className="min-h-screen flex flex-col">

  
    <Header></Header>
    <div className=" grid gap-y-3 mb-8 ">
         {err && <h1>{err}</h1>}
     <div className="flex justify-center flex-col items-center sm:flex-row gap-x-3 p-2">
      <h1 className="first-letter:uppercase font-serif">by {singlepost.author.name}  *</h1>
      <p className="font-medium font-mono">Updated: {new Date(singlepost.updatedAt).toDateString() }</p>
     </div>
    {
      singlepost.image &&
       <div className="h-[200px] flex justify-center min-w-[80%] max-w-[95%] sm:h-[400px] sm:p-4 sm:min-w-[60%] sm:max-w-[70%] py-3 px-2 rounded-md mx-auto bg-gray-200 ">

         <img className=" h-full object-contain rounded-lg" src={singlepost.image} alt="image doesn't supported" />
       </div>  
}
     <div className="grid gap-y-3 px-2 items-center lg:ml-4 justify-center">
      
       <h1 className="font-semibold xl:text-2xl text-gray-700 font-serif ">{singlepost.title}</h1>
       <p className="font-mono text-gray-500 xl:text-2xl">{singlepost.description}</p>
       </div>
      <div className="flex gap-x-10 px-2 mt-3 lg:ml-3 justify-center">
        <button
          onClick={() => {
            navigate(`/editpost/${singlepost._id}`);
          }}
          className="bg-purple-700  p-1 px-3 text-sm tracking-widest rounded-md active:scale-95 hover:cursor-pointer text-white"
        >
          Edit
        </button>
        <button
          onClick={deletehandle}
          className="bg-red-500 p-2 fond-bold px-3 text-sm tracking-widest rounded-sm active:scale-95 hover:cursor-pointer text-white"
        >
          delete
        </button>
      </div>
    </div>
  <Footer></Footer>
   </div>
  );
};
export default SinglePost;
