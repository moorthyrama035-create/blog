import React from 'react'
import blog from "../assets/bloggirl.png"
const Center = () => {
  return (
    <div className='sm:grid grid-cols-2 sm:m-5 min-w-[300px] gap-x-2 rounded-lg  bg-purple-100  p-3'>
          <div className='self-center'>
              <div className='flex flex-col items-center gap-y-2 font-extrabold font-serif text-gray-700'>
              <h1>Share Your Thoughts.</h1>
              <h1>Inspire the World.</h1>
               </div>
               <div className='flex flex-col gap-y-2 items-center'>
                <p className='text-gray-500'>Discover stories,ideas,and perspectives from writers around the world</p>
                <button className='bg-purple-700 p-2 w-fit rounded-lg text-white font-bold'>Explore Posts</button>
               </div>
          </div>
          <div >
            <img className='object-contain' src={blog} alt=""/>
          </div>
    </div>
  )
}

export default Center