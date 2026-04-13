const getStatusBadge = (date, capacity) => {
  const today = new Date()
  const eventDate = new Date(date)
  if (eventDate < today) return { label: 'Past', color: 'bg-gray-100 text-gray-500' }
  if (capacity <= 10) return { label: 'Almost Full', color: 'bg-red-50 text-red-500' }
  return { label: 'Upcoming', color: 'bg-green-50 text-green-600' }
}

const EventCard = ({ event, isAdmin, onEdit, onDelete }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const status = getStatusBadge(event.date, event.capacity)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">

      {/* Status and the  capacity */}
      <div className="flex justify-between items-center">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${status.color}`}>
          ● {status.label}
        </span>
        <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
          {event.capacity} seats
        </span>
      </div>

      {/* Accent bar */}
      <div className="w-10 h-1 bg-purple-500 rounded-full group-hover:w-16 transition-all duration-300" />

      {/* Title + Description */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-indigo-900 mb-1 group-hover:text-purple-700 transition-colors duration-200">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {event.description || 'No description provided.'}
        </p>
      </div>

      {/* Details of the evnt */}
      <div className="space-y-2 border-t border-gray-50 pt-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Location: </span>
          <span className="font-medium truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Date: </span>
          <span className="font-medium">{formattedDate}</span>
        </div>
      </div>

      {/* the admin vuttons */}
      {isAdmin && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onEdit(event)}
            className="flex-1 bg-indigo-50 text-indigo-700 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all duration-200"
          >
            Edit event
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="flex-1 bg-red-50 text-red-500 py-2 rounded-xl text-sm font-bold hover:bg-red-100 transition-all duration-200"
          >
            Delete event
          </button>
        </div>
      )}
    </div>
  )
}

export default EventCard