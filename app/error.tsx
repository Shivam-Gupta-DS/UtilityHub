"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Something went wrong!</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
        We apologize for the inconvenience. Please try again or contact our support team if the problem persists.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={() => reset()}>
          Try Again
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
