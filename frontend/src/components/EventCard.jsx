const EventCard = ({ event, isAdmin, onEdit, onDelete }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
          {event.capacity} seats
        </span>
      </div>

      <p className="text-gray-500 text-sm">{event.description}</p>

      <div className="flex flex-col gap-1 text-sm text-gray-600">
        <span>📍 {event.location}</span>
        <span>📅 {formattedDate}</span>
      </div>

      {isAdmin && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onEdit(event)}
            className="flex-1 bg-yellow-400 text-white py-1 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="flex-1 bg-red-500 text-white py-1 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default EventCard