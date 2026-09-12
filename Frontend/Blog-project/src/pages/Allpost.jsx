import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {OrbitProgress}  from "react-loading-indicators"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Center from "../components/Center";
const Allpost = () => {
  const navigate=useNavigate()
  let [post, setpost] = useState([]);
  let [err, seterr] = useState("");
  let [loading,setloading]=useState(true);
  let [category,setcategory]=useState([])
  let [filtercategory,setfiltercategory]=useState([])
  let [input,setinput]=useState("")
  let [totalpage,settotalpage]=useState(0)
  let [categoryupdate,setcategoryupdate]=useState(false)
  let [emptycategory,setemptycategory]=useState(false)
  const limit=4;
  let [page,setpage]=useState(1)
  let fetch = async () => {
    try {
      let posts = await axios.get(`https://mern-stack-blog-production-b5b5.up.railway.app/api/posts?page=${page}&limit=${limit}`,{
         headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
      });
      setpost(posts.data.data);
      settotalpage(posts.data.totalpage)
      console.log(posts.data);
        
    }
    catch (err) {
      seterr(err.message);
    }
    finally{
      setloading(false)
    }
  };
useEffect(()=>{
  fetch();
},[page])
  useEffect(() => {
    axios.get("https://mern-stack-blog-production-b5b5.up.railway.app/api/category",{
           headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
    }).then((res)=>{
         setcategory(res.data)
    })
  }, []);
  if(loading){
       return(
          <div>
              <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
          </div>
          )
  }
    return (
  
    <div className="flex flex-col min-h-screen"  >
     <Header></Header>
      <Center></Center>
    <div className="  grid lg:grid-cols-3  gap-y-4 gap-x-1 "> 
      <div className="m-2 lg:order-1 lg:col-span-2 order-2 sm:m-5" >
         {err && <h1>{err}</h1>}
        <ul className="flex flex-col gap-y-2 sm:gap-y-4">
          {post.map((items) => {
                  let categoryname=category.find((item)=>{
                       return item._id===items.category
                  })   
             
                  

            return (
              <li key={items._id} className="flex flex-col sm:flex-row gap-y-2 gap-x-2">
            {
              items.image &&
          
               <div onClick={()=>{
                      navigate(`/home/${items._id}`)
                } }className="h-[200px] sm:w-[300px] ">

                 
                  <img
                  src={items.image}
                  className="w-full h-full object-fill sm:object-fill rounded-md"
                  alt=""
                  />              
                </div>
          }
              <div className="shadow shadow-sm flex-1 p-2 flex flex-col gap-y-2  shadow-gray-400  rounded-sm hover:cursor-pointer" onClick={()=>{
                      navigate(`/home/${items._id}`)
                }}>
                  <h1 className="font-serif">author : {items.author.name}</h1>
                  <p>{new Date(items.createdAt).toDateString()}</p>
                 <div>
                  <h5 className="text-white font-serif px-3 rounded-md font-semibold bg-purple-600  uppercase w-fit  p-1 ">{categoryname.name}</h5>
                  </div >
                  <div className="flex flex-col gap-y-1 ">
                  <h1 className="text-lg font-medium">{items.title}</h1>
                  <p>{items.description.slice(0,80)}...</p>
                  </div>
              </div>
              </li>
            );
          })}
        </ul>
      </div> 
    
    <div className="order-1 m-2 sm:flex flex-col grid gap-y-3 sm:m-5">
        <div className="flex gap-x-1 ">
            <input placeholder="Enter a Category" type="text" value={input} onChange={(e)=>{
                  setinput(e.target.value)
            }} className="outline-2 focus:outline-purple-400 md:grow-3 grow-2 text-lg rounded-md outline-gray-400 basis-2 px-2"/>
            <button onClick={()=>{
                   setinput("")    
              
                   var filteredcategory=category.filter((items)=>{
                      return items.name.toLowerCase().includes(input.toLowerCase());
                   });
                   console.log(filteredcategory);
                   
                   if(filteredcategory.length===0){        
                    
                     setemptycategory(true)
                   }
                   setcategoryupdate(true);
                   setfiltercategory(filteredcategory)
                 
            }} className="bg-purple-500 md:grow-1 text-white font-bold tracking-wider cursor-pointer active:scale-95 rounded-md basis-1 grow-1 p-2 active:scale-95">search</button>
      </div>
       {
        categoryupdate &&
          <div className="border-2 shadow shadow-md rounded-lg shadow-gray-500 border-gray-300 p-3">  
            <h1 className="font-bold">Categories</h1>
            {      
                emptycategory &&<h1 className="text-center font-medium  mt-3">This Category hasn't available...!</h1>
            }
              {
                categoryupdate &&
                <ul className="flex flex-col gap-y-1 mt-3 "> 
              {
               filtercategory.map((items)=>{
                       return(
                         <li key={items._id} onClick={()=>{         
                          navigate(`/category/${items._id}/${items.name}`)
                        }} className="border-1 hover:cursor-pointer border-gray-300 p-2 rounded-sm">{items.name}</li>
                       )
                  })
                }
              </ul>
}
        </div>
}
     </div>
</div>
{
totalpage>1 &&

   <div className="flex gap-x-3 mt-2 justify-center ">
      <button className="text-blue-500 font-semibold cursor-pointer  " onClick={()=>{
              if(page>1){
                setpage(page-1)
              }
      }}>Previous</button>
        {
         Array.from({length:totalpage},(_,index)=>{
                 return index+1
         }).map((page)=>{
            return(
                 <button className="bg-purple-600 text-white p-1 px-4 rounded-md font-medium  cursor-pointer" onClick={()=>{
                       setpage(page)
                 }} key={page}>{page}</button>
            )
       })
    }
        <button className="text-blue-500 cursor-pointer font-semibold" onClick={()=>{
            if(page<totalpage){
              setpage(page+1)
            }
        }}>Next</button>
    </div>
   
      }

    <Footer category={category}></Footer>
    </div>
    

    );

};

export default Allpost;
