export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse text-center">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4 mx-auto"></div>
        <div className="h-4 w-32 bg-gray-200 rounded mb-8 mx-auto"></div>
        <div className="h-64 w-full max-w-2xl bg-gray-200 rounded mb-4 mx-auto"></div>
      </div>
    </div>
  )
}
