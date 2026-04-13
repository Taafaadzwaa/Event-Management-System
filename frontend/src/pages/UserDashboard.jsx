import { useEffect, useState } from 'react'
import API from '../api/axios'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import SkeletonCard from '../components/SkeletonCard'
import { useAuth } from '../context/AuthContext'

const UserDashboard = () => {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => { fetchEvents() }, [])

  useEffect(() => {
    let result = events
    if (search) {
      result = result.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (statusFilter !== 'All') {
      const today = new Date()
      result = result.filter(e => {
        const eventDate = new Date(e.date)
        if (statusFilter === 'Upcoming') return eventDate >= today
        if (statusFilter === 'Past') return eventDate < today
        return true
      })
    }
    setFiltered(result)
  }, [search, statusFilter, events])

  const fetchEvents = async () => {
    try {
      const res = await API.get('/events')
      setEvents(res.data)
      setFiltered(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const upcomingCount = events.filter(e => new Date(e.date) >= new Date()).length
  const totalCapacity = events.reduce((sum, e) => sum + Number(e.capacity), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900">
            Good day, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Browse and explore all upcoming events
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {[
            { label: 'Total Events', value: events.length, color: 'text-indigo-900' },
            { label: 'Upcoming', value: upcomingCount, color: 'text-purple-600' },
            { label: 'Total Seats', value: totalCapacity, color: 'text-indigo-900' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 sm:mb-2 truncate">
                {stat.label}
              </p>
              <p className={`text-2xl sm:text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search by title or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Upcoming', 'Past'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  statusFilter === s
                    ? 'bg-indigo-900 text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-gray-400 mb-4 font-medium">
            Showing <span className="text-indigo-900 font-bold">{filtered.length}</span> event{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 sm:py-24">
            <p className="text-5xl sm:text-6xl mb-4">📭</p>
            <p className="text-lg sm:text-xl font-bold text-indigo-900 mb-2">No events found</p>
            <p className="text-gray-400 text-sm sm:text-base">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} isAdmin={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard