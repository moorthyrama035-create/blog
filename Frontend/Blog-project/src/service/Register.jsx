import axios from 'axios'
import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { useNavigate } from 'react-router-dom'
import Blogimage from "../assets/blog.png"
import bloggirl from "../assets/bloggirl.png"
import { Link } from 'react-router-dom'
const Register = () => {
  let navigate=useNavigate()
   
  const userschema=yup.object({
    name:yup.string().required("name is required"),
    email:yup.string().email("Enter a valid email").required("email is required"),
    password:yup.string().required("Password is required").matches(/^[a-zA-Z]+[0-9]+$/),
    Cpassword:yup.string().oneOf([yup.ref("password")],"Password doesn't match").required("Confirm password is required")
  });
  let {register,handleSubmit,formState:{errors}} =useForm({
   resolver:yupResolver(
          userschema
  )
  }
  );
function handlesubmit(data){
  console.log(data);
  
        axios.post("https://mern-stack-blog-production-b5b5.up.railway.app/api/Register",data).then((res)=>{      
                 confirm(res.data.message);
                navigate("/login")      
        }).catch((err)=>{
             alert(err.response.data.message)
        })
}
  return (
    <div className='bg-purple-100 min-w-[310px] min-h-screen max-h-fit'>
      <header className='p-2'>
        <img className='w-25' src={Blogimage} alt=""/>
      </header>
    <div className='flex flex-col gap-y-2 '>
      <div className='grid gap-y-3 p-3'> 
        <p className='font-bold text-center'>Share your ideas <span className='text-purple-700'>inpire</span> the world</p>
        <p className='text-gray-500 text-center' >join our community of writers and readers.Create,Share and grow together</p>
        <img className='w-[200px] object-contain m-auto ' src={bloggirl} alt=""/>
      </div>
       <div className='bg-white  m-6 md:mx-9 lg:mx-16  rounded-md pt-2 pb-3 sm:p-3 '>
        <h1 className='text-center text-lg font-medium font-serif tracking-wider'>Create Your Account</h1>
         <p className='text-center text-sm font-sans'>Let's get you started</p>
         <form onSubmit={handleSubmit(handlesubmit)} className='p-3 grid gap-y-4' action="">
            <input  {...register("name")}  className='outline-2 p-2 placeholder:text-gray-800 px-2 focus:outline-purple-400  block rounded-sm text-lg outline-gray-300 ' placeholder='Full Name' type="text"/>
           {errors.name &&  <p className='text-red-500'>{errors.name.message}</p>}
            <input  {...register("email")} className='p-2 outline-2 block rounded-sm text-lg outline-gray-300 focus:outline-purple-400  placeholder:text-gray-800 px-2' placeholder='email' type="text"/>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p> }
            <input  {...register("password")}  className='p-2 outline-2 block rounded-sm text-lg focus:outline-purple-400  outline-gray-300 placeholder:text-gray-800 px-2' placeholder='Password' type="text"/>
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            <input {...register("Cpassword")} className='outline-2 p-2 block rounded-sm text-lg focus:outline-purple-400  outline-gray-300 placeholder:text-gray-800 px-2' placeholder='Confirm Password' type="text"/>
            {errors.Cpassword && <p className='text-red-500'>{errors.Cpassword.message}</p>}
            <button className='rounded-md font-sans text-white font-medium cursor-pointer active:scale-95 bg-purple-800 p-2' type='submit'>Register</button>
         </form>
            <h1 className='text-center'>Already have an account ? <span className='text-purple-600 font-medium' onClick={()=>{
               
            }}><Link to="/login">Login</Link></span></h1>
         </div>
    </div>


    </div>
  )
}

export default Register
