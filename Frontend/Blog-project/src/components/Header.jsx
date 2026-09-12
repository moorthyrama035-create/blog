import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  let [showMenu,setmenu]=useState(false)  
      return (
  <div className='min-w-[300]  p-3   bg-white '>
     <header className=' flex justify-between'>   
        <div>
        <h1 className='font-bold '>Blogify</h1>
        </div>    
        <ul className=' hidden sm:block sm:flex items-center  gap-x-3'>
       <Link to={"/home"}> <li className='hover:text-black hover:underline font-semibold text-gray-500 cursor-pointer transition-all duration-300'>Home</li></Link>
        <Link to="/home"> <li className='hover:text-black font-semibold text-gray-500 hover:underline cursor-pointer transition-all duration-300'>All Post</li></Link>
        <Link to="/home">  <li className='hover:text-black hover:underline font-semibold text-gray-500 cursor-pointer transition-all duration-300'>Category</li></Link>
        <a href="#About"><li className='hover:text-black hover:underline font-semibold text-gray-500 cursor-pointer transition-all duration-300'>About</li></a>
        </ul>
        <div>
        <Link to="/createpost"> <button className='bg-purple-700 p-2 hidden sm:block py-1 rounded-md text-white font-medium hover:cursor-pointer active:scale-95' >Write a Post</button></Link>
        </div>
      <div onClick={()=>{
               setmenu(!showMenu)
        }} className='cursor-pointer sm:hidden'>
           <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/menu--v1.png" alt="menu--v1"/>
      </div>
    </header>
      <ul className={`${showMenu ?"block" : "hidden"} flex py-2 flex-col gap-y-3  tracking-widest text-white font-semibold bg-purple-400 text-gray-500 items-center`}>
             <Link to={"/home"}><li className='hover:text-black hover:underline cursor-pointer transition-all duration-300'>Home</li></Link>
             <Link to="/"> <li className='hover:text-black hover:underline cursor-pointer transition-all duration-300'>All Post</li></Link>
             <li className='hover:text-black hover:underline cursor-pointer transition-all duration-300'>Category</li>
             <li className='hover:text-black hover:underline cursor-pointer transition-all duration-300'>About</li>
            <Link to="/createpost"> <button className='bg-purple-700 p-2  py-1 rounded-md text-white font-medium hover:cursor-pointer active:scale-95' >Write a Post</button></Link>
      </ul>
</div>   
  )
}

export default Header