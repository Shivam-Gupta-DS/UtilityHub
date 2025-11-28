import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EmergencyServices() {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1584744982491-665216d95f8b?q=80&w=1000&auto=format&fit=crop"
          alt="Emergency services background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-red-500/80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <AlertTriangle className="h-12 w-12 text-white mr-4" />
            <div className="text-white">
              <h2 className="text-3xl font-bold">Emergency Services</h2>
              <p className="text-white/80">Quick response for urgent service needs</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex items-center mb-4 md:mb-0 md:mr-6 text-white">
              <Phone className="h-5 w-5 mr-2" />
              <span className="font-bold">Hotline: 1800-123-4567</span>
            </div>
            <div className="flex items-center mb-4 md:mb-0 md:mr-6 text-white">
              <Clock className="h-5 w-5 mr-2" />
              <span>Average response time: 30 minutes</span>
            </div>
            <Button size="lg" className="bg-white text-red-500 hover:bg-white/90" asChild>
              <Link href="/emergency">Request Emergency Service</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
