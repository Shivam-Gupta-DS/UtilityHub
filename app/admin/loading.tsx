export default function AdminLoading() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded mt-4 md:mt-0"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-24 bg-gray-200 rounded"></div>
        ))}
      </div>

      <div className="h-12 w-full bg-gray-200 rounded mb-4"></div>
      <div className="h-[500px] w-full bg-gray-200 rounded"></div>
    </div>
  )
}
