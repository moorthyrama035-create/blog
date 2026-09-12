import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {OrbitProgress}  from "react-loading-indicators"
import Header from '../components/Header'
const Category = () => {
    const {categoryid,catname}=useParams()
    let [post,setpost]=useState([])
    let [err,seterr]=useState("")
    let [loading,setloading]=useState(true)
    let navigate=useNavigate()
    useEffect(()=>{
             axios.get(`https://mern-stack-blog-production-b5b5.up.railway.app/api/category/${categoryid}`,{
               headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
             })
             .then((res)=>{
                   setpost(res.data)
             }).catch((err)=>{
                 seterr(err.message)
             }).finally(()=>{
                setloading(false)
             })
    },[])
     if(loading){
           return(
              <div>
                  <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
              </div>
              )
      }
       return (
     <div className="">
      <Header></Header>
         {err && <h1>{err}</h1>}
       
         <h1 className='text-center  font-serif text-2xl mt-3 uppercase bg-gradient-to-r from-purple-800 to-gray-500 tracking-widest  font-extrabold bg-clip-text text-transparent'>{catname}</h1>
     {
            post.length<1 ? <h1 className='text-center mt-3 font-mono'>No posts available in this catgory yet!</h1> :
        <ul className="grid  gap-y-4 mt-2 lg:grid-cols-2 lg:gap-x-2 ">
          {post.map((items) => {
            return (
              <li key={items._id} className="lg:mx-0 lg:px-1  mx-2 px-2 sm:px-9 grid gap-y-1 gap-x-2 md:flex  ">
                {items.image && <div onClick={()=>{
                     navigate(`/home/${items._id}`)
                }} className='w-full  h-[300px]  sm:h-[400px]  md:h-[250px] md:w-[250px]'>     
                  <img
                    src={items.image}
                    className=" w-full h-full object-fill rounded-md"
                    alt=""
                  />
                  </div>
                }
                <div className="shadow  shadow-sm  flex-1 p-3  flex flex-col gap-y-1 shadow-gray-400  rounded-sm hover:cursor-pointer" onClick={()=>{
                      navigate(`/home/${items._id}`)
                }}>
                <div className='grid gap-y-1' >
                  <h5 className="text-white rounded-sm font-serif font-semibold bg-purple-500 w-fit p-1 px-3  ">{items.category.name}</h5>
                  <h1 className='font-serif'>By {items.author.name} .</h1>
                  <p className='font-mono'>{new Date(items.createdAt).toDateString()}</p>
                  </div >
                  <div className='grid gap-y-1'>

                  <h1 className="text-lg font-medium">{items.title}</h1>
                  <p className='text-gray-600 first-letter:uppercase '>{items.description.slice(0,80)}.....</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
     }
     </div>
       )
}

export default Category