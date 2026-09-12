import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
import {OrbitProgress}  from "react-loading-indicators"
import Header from '../components/Header'
const Createpost = () => {
    let [userposts,setpost]=useState({
           title:"",
           description:"",
           category:"",
           image:""
    })
    let [load,setload]=useState(false)
    let [handle,sethandle]=useState(false)
    let navigate= useNavigate()
    function inputhandle(e){
          let {value,name,files}=e.target
          setpost({
            ...userposts,
            [name]:files ?files[0] :value
          }
          )
    }
    function handlesubmit(e){
         sethandle(true)
         e.preventDefault()
         let formdata=new FormData()
         formdata.append("title",userposts.title)
        formdata.append("description",userposts.description)
        formdata.append("category",userposts.category)
        formdata.append("image",userposts.image)
         axios.post("https://mern-stack-blog-production-b5b5.up.railway.app/api/posts",formdata,
          {
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
          }
         ).then(()=>{
               
               return   Swal.fire({
  title: "created successfully!",
  icon: "success",
  draggable: true
});
         })
         .then((res)=>{
               if(res.isConfirmed){
                      navigate("/home")
               }
         })
         .finally(()=>{
                  sethandle(false)
         })
    }
    

  return (
  <div>
   <Header></Header>
   {
    handle  && 
       <div className='flex justify-center p-2'>

          <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="wait a minute" textColor="" />
       </div>
     
   }
   <div className='bg-gray-500 pt-4 min-h-screen '>
    <div className=' mt-18  bg-white sm:max-w-[70%]  sm:mx-auto mx-2 rounded-md  p-2 py-5' >
        <h1 className='font-bold tracking-widest text-gray-800 text-center' >Create Posts</h1>
        <form onSubmit={handlesubmit} action="" className='grid gap-y-4 mt-3 items-center' >
            <input className='outline-2 rounded-sm outline-gray-400 px-2 text-lg p-1 focus:outline-purple-800'  name='title'  onChange={inputhandle}    placeholder='title' />
            <input className='outline-2 rounded-sm outline-gray-400 px-2 text-lg p-1 focus:outline-purple-800'  onChange={inputhandle} name='description'  placeholder='description'/>
            <input className='outline-2 rounded-sm outline-gray-400 px-2 text-lg p-1 focus:outline-purple-800'  onChange={inputhandle} name='category'  type="text" placeholder='category'/>
            <input  className='bg-purple-100 py-2 file:border-2 file:border-gray-300 text-gray-600 file:active:scale-95 rounded-md file:text-white file:p-1 file:ml-1 file:rounded-md file:bg-indigo-800' onChange={inputhandle} name='image'  type="file" accept='image/*'/>
            <button className='bg-purple-600 p-1 py-2 text-white font-medium tracking-widest rounded-md active:scale-95'  type='submit'>Submit</button>
        </form>
    </div>
  </div>
  </div>

  )
}

export default Createpost