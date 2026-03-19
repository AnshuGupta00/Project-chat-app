import React from 'react'
import Header2 from './Header2'
function Header() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center mt-6 mx-4 sm:mx-8 md:mx-16">
      <img
        src="https://gaming-cdn.com/images/products/2419/616x353/batman-arkham-knight-pc-game-steam-cover.jpg?v=1703252478"
        className="w-48 sm:w-64 md:w-80 h-auto rounded-xl object-cover"
        alt="Chat App"
      />
      <div className="w-48 sm:w-64 md:w-80 mt-3 text-right">
        <h4 className="text-white text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h4>
      </div>
    </div>
  )
}

export default Header
