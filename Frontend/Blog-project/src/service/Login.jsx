import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Blogimage from "../assets/blog.png"
import bloggirl from "../assets/bloggirl.png"
import { Link } from 'react-router-dom'
const Login = () => {
   let [email,setemail]=useState("")
   let [password,setpassword]=useState("")

      let navigate=  useNavigate()
   function handlesubmit(e){
                  e.preventDefault()
                  setemail("")
                  setpassword("")
                  axios.post("https://mern-stack-blog-production-b5b5.up.railway.app/api/Login",{email:email.trim(),password:password.trim()}).then((res)=>{
                         localStorage.setItem("token",res.data.token)
                         confirm(res.data.message)   
                         navigate("/home")
                  }).catch((err)=>{
                     
                       console.log(err.response);
                       
                       alert(err.response.data.message)
                  })
  }
  return (
    <div  className='bg-purple-100 min-h-screen max-h-fit min-w-[310px]'>
        <header className='p-2'>
              <img className='w-25' src={Blogimage} alt=""/>
          </header>
    <div  className='flex flex-col gap-y-2 '>
        <div className='grid gap-y-3 p-3'> 
              <p className='font-bold text-center'>Share your ideas <span className='text-purple-700'>inpire</span> the world</p>
              <p className='text-gray-500 text-center' >join our community of writers and readers.Create,Share and grow together</p>
              <img className='w-[200px] object-contain m-auto ' src={bloggirl} alt=""/>
         </div>
      <div  className='bg-white  m-6 rounded-md pt-2 pb-3  lg:mx-26 sm:p-3 md:p-4 p-3'>

        <h1 className='text-center text-2xl font-bold font-serif'> Welcome Back </h1>
          <form onSubmit={handlesubmit} className='grid gap-y-5   md:gap-y-9 pt-4 ' >
              <input required onChange={(e)=>{
                setemail(e.target.value)
              }}  className='outline-2 p-2 block focus:outline-purple-500 placeholder:text-gray-800 px-3 rounded-sm text-lg outline-gray-300' type="text" placeholder='email'/>
              <input required onChange={(e)=>{
                    setpassword(e.target.value)
              }} className='outline-2 p-2 focus:outline-purple-500 block rounded-sm text-xl  placeholder:text-gray-800 px-3  outline-gray-300' type="text" placeholder='Password'/>
              <button className='bg-purple-800 font-bold rounded-lg tracking-widest p-2 cursor-pointer active:scale-95 text-white' type='submit'>Login </button>
          </form>
           <h1 className='text-center'>Don't have an account ?<span className='text-purple-600 font-bold'><Link to="/">Register</Link></span></h1>
      </div>
    </div>
    </div>
  )
}

export default Login
