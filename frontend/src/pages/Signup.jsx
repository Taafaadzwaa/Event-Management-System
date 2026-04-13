import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import logo from "../assets/Taffi’s Event Manager Logo.png";

const Signup = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/signup', formData)
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex w-1/2 bg-indigo-900 flex-col justify-center items-center text-white p-12">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-900 text-3xl font-bold mb-6 shadow-lg">
          E
        </div>
        <h1 className="text-4xl font-bold mb-3">
          Join Event<span className="text-purple-400">Manager</span>
        </h1>
        <p className="text-indigo-200 text-center text-lg max-w-sm leading-relaxed">
          Create your free account and start exploring events today.
        </p>

        <div className="mt-12 space-y-3 w-full max-w-sm">
          {[
            { icon: '🎟️', text: 'Browse upcoming events' },
            { icon: '📍', text: 'Find events near you' },
            { icon: '📅', text: 'Never miss an event' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 bg-indigo-800 border border-indigo-700 rounded-xl px-4 py-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">

          
           {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={logo} // or your imported logo
                alt="Event Manager Logo"
                className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-white/20"
              />
              {/* a lil glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-md opacity-60"></div>
            </div>
            <span className="text-xl font-bold text-indigo-900">Event<span className="text-purple-600">Manager</span></span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-2">Create account</h2>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">Fill in your details to get started</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
               {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Taffi Chipa "
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-900 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all duration-200 disabled:opacity-50 shadow-md mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup