import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from "../assets/Taffi’s Event Manager Logo.png";


const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-8 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center">

        
        {/* Logo */}
<div className="flex items-center gap-4">
  <div className="relative">
    <img
      src={logo} // or your imported logo
      alt="Event Manager Logo"
      className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-white/20"
    />
    {/* subtle glow effect */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-md opacity-60"></div>
  </div>

  <div className="leading-tight">
    <span className="block text-xl font-bold text-indigo-900 tracking-tight">
      Event
    </span>
    <span className="block text-xl font-bold text-purple-600 tracking-tight">
      Manager
    </span>
  </div>
</div>



        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-900 flex items-center justify-center text-white font-bold text-sm shadow">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800 leading-tight">{user?.name}</span>
              <span className={`text-xs font-semibold capitalize ${user?.role === 'admin' ? 'text-purple-600' : 'text-indigo-400'}`}>
                {user?.role === 'admin' ? ' Admin' : 'User'}
              </span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-red-500 font-semibold transition-colors duration-200"
          >
            Sign Out 
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-0.5 bg-indigo-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-indigo-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-indigo-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden mt-4 border-t border-gray-100 pt-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-900 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{user?.name}</p>
              <p className={`text-xs font-semibold ${user?.role === 'admin' ? 'text-purple-600' : 'text-indigo-400'}`}>
                {user?.role === 'admin' ? 'Admin' : 'User'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-red-500 font-semibold py-2 border-t border-gray-100"
          >
            Sign Out 
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar