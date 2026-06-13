import { useState } from 'react'
import './App.css'
import Header from './Header'
import Header2 from './Header2'
import Third from './Third'
import { Link } from 'react-router-dom'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="max-h-min w-full bg-black">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-amber-700 relative">

        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">ChatApp</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center text-white font-semibold gap-8 cursor-pointer">
          <Link to="/Features">
            <li className="hover:text-orange-400 transition">Features</li>
          </Link>
          <Link to="/Privacy">
            <li className="hover:text-orange-400 transition">Privacy</li>
          </Link>
          <li className="hover:text-orange-400 transition">Help Center</li>
          <li className="hover:text-orange-400 transition">Blog</li>
          <li className="hover:text-orange-400 transition">For Business</li>
          <Link to="/userlist">
            <li className="hover:text-orange-400 transition">App</li>
          </Link>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4 text-white font-semibold">
          <Link to="/login">
            <button className="hover:text-gray-300 transition">Login</button>
          </Link>
          <Link to="/Download">
            <button className="px-5 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition">
              Download
            </button>
          </Link>
        </div>

        {/* Hamburger Icon — mobile only */}
        <button
          className="md:hidden text-white text-3xl cursor-pointer focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-amber-700 px-8 py-4 flex flex-col gap-4 text-white font-semibold">
          <Link to="/Features" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-orange-400 transition">Features</p>
          </Link>
          <Link to="/Privacy" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-orange-400 transition">Privacy</p>
          </Link>
          <p className="hover:text-orange-400 transition cursor-pointer">Help Center</p>
          <p className="hover:text-orange-400 transition cursor-pointer">Blog</p>
          <p className="hover:text-orange-400 transition cursor-pointer">For Business</p>
          <Link to="/userlist" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-orange-400 transition">App</p>
          </Link>

          {/* Buttons in mobile menu */}
          <div className="flex flex-col gap-3 pt-2 border-t border-amber-600">
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full hover:text-gray-300 transition text-left">
                Login
              </button>
            </Link>
            <Link to="/Download" onClick={() => setMenuOpen(false)}>
              <button className="w-full px-5 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition">
                Download
              </button>
            </Link>
          </div>
        </div>
      )}

      <Header />
      <Header2 />
      <Third />
    </div>
  );
}

export default App;