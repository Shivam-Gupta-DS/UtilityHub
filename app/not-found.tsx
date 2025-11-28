import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Button size="lg" asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
