import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

interface ServiceCardProps {
  service: {
    id: string
    name: string
    description: string
    image: string
    basePrice: number
    currentPrice: number
    demandLevel: "low" | "medium" | "high" | "very-high"
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const isPriceIncreased = service.currentPrice > service.basePrice

  // Determine demand color based on level
  const getDemandColor = () => {
    switch (service.demandLevel) {
      case "low":
        return "bg-green-50 border-green-200"
      case "medium":
        return "bg-yellow-50 border-yellow-200"
      case "high":
        return "bg-orange-50 border-orange-200"
      case "very-high":
        return "bg-red-50 border-red-200"
      default:
        return "bg-white"
    }
  }

  // Determine demand tag text and color
  const getDemandTag = () => {
    if (service.demandLevel === "high" || service.demandLevel === "very-high") {
      return (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md animate-pulse">
          High Demand
        </div>
      )
    }
    return null
  }

  return (
    <Link href={`/services/${service.id}`}>
      <Card className={`overflow-hidden h-full transition-all hover:shadow-md ${getDemandColor()}`}>
        <div className="relative h-48 w-full">
          <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
          {getDemandTag()}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{service.name}</h3>
          </div>
          <p className="text-muted-foreground text-sm mt-2">{service.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div>
            <p className="font-semibold">
              ₹{service.currentPrice}
              {isPriceIncreased && (
                <span className="text-sm text-muted-foreground line-through ml-2">₹{service.basePrice}</span>
              )}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardFooter>
      </Card>
    </Link>
  )
}
