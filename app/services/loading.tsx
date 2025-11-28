export default function ServicesLoading() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="animate-pulse text-center mb-12">
        <div className="h-10 w-64 bg-gray-200 rounded mb-4 mx-auto"></div>
        <div className="h-4 w-96 bg-gray-200 rounded mb-4 mx-auto"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="h-10 w-full bg-gray-200 rounded"></div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>

      <div className="h-12 w-full bg-gray-200 rounded mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg h-64"></div>
        ))}
      </div>
    </div>
  )
}
