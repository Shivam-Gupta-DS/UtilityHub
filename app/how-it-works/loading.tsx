export default function HowItWorksLoading() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="animate-pulse text-center mb-12">
        <div className="h-10 w-64 bg-gray-200 rounded mb-4 mx-auto"></div>
        <div className="h-4 w-96 bg-gray-200 rounded mb-4 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      <div className="h-64 w-full bg-gray-200 rounded mb-16"></div>
    </div>
  )
}
