import { useState } from 'react'
import './App.css'
import Header from './Header'
import Header2 from './Header2'
import Third from './Third'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-black">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-amber-700 bg-fixed">
        
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">
          ChatApp
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center text-white font-semibold gap-8 cursor-pointer">
          <Link to="/Features">
            <li className="hover:text-orange-400 transition">Features</li>
          </Link>
          
          <li className="hover:text-orange-400 transition">Privacy</li>
          <li className="hover:text-orange-400 transition">Help Center</li>
          <li className="hover:text-orange-400 transition">Blog</li>
          <li className="hover:text-orange-400 transition">For Business</li>
          <li className="hover:text-orange-400 transition">App</li>
        </ul>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-white font-semibold">

   <Link to="/login">
  <button className="w-full sm:w-auto hover:text-gray-300 transition">
    Login
  </button>
  </Link>

  
  <button className="w-full sm:w-auto px-5 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition">
    Download
  </button>
</div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white text-3xl cursor-pointer">
          ☰
        </div>
      
      </nav>
<Header />
<Header2 />
<Third />
    </div>
  )
  
}

export default App
