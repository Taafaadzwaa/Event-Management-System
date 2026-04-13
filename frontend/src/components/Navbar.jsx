import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">🎟️ Event Manager</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">
          👋 {user?.name}{' '}
          <span className="bg-blue-800 px-2 py-1 rounded-full text-xs ml-1">
            {user?.role}
          </span>
        </span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar