const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">Delete</span>
          </div>
          <h3 className="text-xl font-bold text-indigo-900 mb-2">Delete Event?</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            This action cannot be undone. The event will be permanently removed from the system.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all duration-200 shadow-md shadow-red-200"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal