import { useEffect, useState } from 'react'
import API from '../api/axios'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import SkeletonCard from '../components/SkeletonCard'
import DeleteModal from '../components/DeleteModal'
import toast from 'react-hot-toast'

const emptyForm = {
  title: '', description: '', location: '', date: '', capacity: ''
}

const AdminDashboard = () => {
  const [events, setEvents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null })

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
      toast.error('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editingId) {
        await API.put(`/events/${editingId}`, form)
        toast.success('Event updated! ✨')
      } else {
        await API.post('/events', form)
        toast.success('Event created! 🎉')
      }
      setForm(emptyForm)
      setEditingId(null)
      setShowForm(false)
      fetchEvents()
    } catch (err) {
      toast.error('Failed to save event')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      capacity: event.capacity
    })
    setEditingId(event.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteClick = (id) => {
    setDeleteModal({ show: true, id })
  }

  const handleDeleteConfirm = async () => {
    try {
      await API.delete(`/events/${deleteModal.id}`)
      toast.success('Event deleted')
      setDeleteModal({ show: false, id: null })
      fetchEvents()
    } catch (err) {
      toast.error('Failed to delete event')
    }
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const upcomingCount = events.filter(e => new Date(e.date) >= new Date()).length
  const totalCapacity = events.reduce((sum, e) => sum + Number(e.capacity), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {deleteModal.show && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModal({ show: false, id: null })}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900">Admin Dashboard</h2>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">Create and manage all your events</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto bg-indigo-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-all duration-200 shadow-md text-sm sm:text-base"
            >
              + New Event
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {[
            { label: 'Total Events', value: events.length, color: 'text-indigo-900' },
            { label: 'Upcoming', value: upcomingCount, color: 'text-purple-600' },
            { label: 'Total Capacity', value: totalCapacity, color: 'text-indigo-900' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 sm:mb-2 truncate">
                {stat.label}
              </p>
              <p className={`text-2xl sm:text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-900 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                {editingId ? '✏️' : '➕'}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900">
                {editingId ? 'Edit Event' : 'Create New Event'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Event title"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  placeholder="Event location"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  required
                  placeholder="Max attendees"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your event..."
                  rows={3}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition resize-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-indigo-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all duration-200 disabled:opacity-50 shadow-md"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Event' : 'Create Event'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
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
            <p className="text-gray-400 text-sm">Try adjusting your search or create a new event</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isAdmin={true}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard

/**
 email: admin@events.com
 password : admin123 */