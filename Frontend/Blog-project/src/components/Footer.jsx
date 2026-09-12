import React from 'react'
import blogimage from "../assets/blog.png"
const Footer = ({category}) => {
  
  return (  
    <div id='About' className='flex items-start mt-auto min-w-[320px] sm:p-3 md:justify-between lg:justify-around p-1 gap-x-2 bg-gray-100 '>
       <div className='grid gap-y-1 '>
           <img className='w-20' src={blogimage} alt=""/>
           <h1 className='text-gray-500 font-mono  '>A platform to share ideas ,stories,and knowledge with the world</h1>
           <div className='flex gap-x-1'>
            <img className='w-4 h-4  md:h-7 md:w-7 hover:scale-105 transition-all duration-600  cursor-pointer' src="https://img.icons8.com/ios/50/instagram-new--v1.png" alt="instagram-new--v1"/>
             <img className='w-4 h-4 md:h-7 md:w-7 hover:scale-105 transition-all duration-600  cursor-pointer'  src="https://img.icons8.com/ios/50/facebook--v1.png" alt="facebook--v1"/>
             <img className='w-4 h-4 md:h-7 md:w-7 hover:scale-105 transition-all duration-600  cursor-pointer' src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="twitterx--v1"/>
             <img className='w-4 h-4 md:h-7 md:w-7  hover:scale-105 transition-all duration-600  cursor-pointer' src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin"/>
           </div>
       </div>
       <div>
          <h1 className='font-bold'>Quick links</h1>
             <ul className='font-mono grid gap-y-1'>
                <li className='text-gray-500 hover:text-gray-800 transition-colors duration-300 cursor-pointer'>Home</li>
                <li className='text-gray-500 hover:text-gray-800 transition-colors duration-300 cursor-pointer'>All posts</li>
                <li className='text-gray-500 hover:text-gray-800 transition-colors duration-300 cursor-pointer'>Categories</li>
                <li className='text-gray-500 hover:text-gray-800 transition-colors duration-300 cursor-pointer'>About</li>
                <li className='text-gray-500 hover:text-gray-800 transition-colors duration-300 cursor-pointer'>Contact</li>
             </ul>
       </div>
       <div>
          <h1 className='font-bold'>Categories</h1>
          <ul className='font-mono grid gap-y-1 text-gray-500'>
             <li>Travel</li>
             <li>Games</li>
             <li>Technology</li>
             <li>Study</li>
          </ul>
       </div>

    </div>
  )
}

export default Footer