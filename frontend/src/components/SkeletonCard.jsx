const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between">
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
      </div>
      <div className="h-1 w-10 bg-gray-200 rounded-full" />
      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-gray-200 rounded-lg" />
        <div className="h-4 w-full bg-gray-100 rounded-lg" />
        <div className="h-4 w-2/3 bg-gray-100 rounded-lg" />
      </div>
      <div className="space-y-2 border-t border-gray-50 pt-3">
        <div className="h-4 w-1/2 bg-gray-100 rounded-lg" />
        <div className="h-4 w-1/3 bg-gray-100 rounded-lg" />
      </div>
    </div>
  )
}

export default SkeletonCard