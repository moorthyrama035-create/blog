import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'

const EditPost = () => {
    const {id}= useParams()
    let navigate=useNavigate()
    let [edit,setedit]=useState({
       title:"",
       description:"",
       category:""
    })

    useEffect(()=>{
             axios.get(`https://mern-stack-blog-production-b5b5.up.railway.app/api/posts/${id}`,{
                 headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
             }).
             then((res)=>{
              console.log(res.data);
              
                  setedit({...res.data,
                    "category":res.data.category.name
                  })
             })
    },[])
    function edithandle(e){
            const {value,name}=e.target
              setedit({
                  ...edit,
                  [name]:value
              })
    }
    function handleSubmit(e){
        e.preventDefault();
        axios.put(`https://mern-stack-blog-production-b5b5.up.railway.app/api/posts/${id}`,edit,{
             headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
        }
        ).then(()=>{
              navigate(`/home/${id}`)
        })

    }
  return (
    <>
    <Header></Header>
    <div className='bg-purple-100 mx-3 p-2 rounded-lg lg:max-w-[60vw] lg:mx-auto mt-10 md:max-w-[70vw] md:mx-auto sm:max-w-[70vw] sm:mx-auto'>
        <h1 className='text-center font-bold text-lg '>Edit Post</h1>
          <form onSubmit={handleSubmit} action="" className='m-10 grid gap-y-5 '>
            <input onChange={edithandle} value={edit.title}  name='title'   className="outline-3 focus:outline-purple-500  block w-full outline-gray-300 p-2 focus:outline-gray-600 rounded-md" type="text" placeholder='title' />
            <input onChange={edithandle} value={edit.description}  name='description' className="outline-3 focus:outline-purple-500 mt-4 block w-full outline-gray-300 p-2 focus:outline-gray-600 rounded-md" type="text" placeholder='description'/>
            <input onChange={edithandle}  value={edit.category} name='category' className="outline-3 focus:outline-purple-500 mt-4 block w-full outline-gray-300 p-2 focus:outline-gray-600 rounded-md" type="text" placeholder='category'/>
            <button  className='bg-purple-600 text-white p-2 px-4 font-bold rounded-md active:scale-95 transition-all duration-300' type='submit'>Submit</button>
         </form>
    </div>
    </>
  )
}

export default EditPost