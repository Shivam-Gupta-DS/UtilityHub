"use client"

import type React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Video, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Provider } from "@/lib/supabase"

interface ProviderCardProps {
  provider: Provider
  onClick?: () => void
}

export default function ProviderCard({ provider, onClick }: ProviderCardProps) {
  const router = useRouter()

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only navigate if the click was directly on the card (not on a button)
    if (e.target === e.currentTarget || !(e.target as HTMLElement).closest("button")) {
      if (onClick) {
        onClick()
      } else {
        router.push(`/providers/${provider.id}`)
      }
    }
  }

  return (
    <Card className="h-full transition-all hover:shadow-md cursor-pointer" onClick={handleCardClick}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={provider.image_url || "/placeholder.svg?height=64&width=64"}
                alt={provider.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            {provider.is_verified && <Badge className="absolute bottom-0 right-0 bg-green-500 text-xs">Verified</Badge>}
          </div>

          <h3 className="font-semibold">{provider.name}</h3>
          <p className="text-sm text-muted-foreground">{provider.profession}</p>

          {provider.location && (
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{provider.location}</span>
            </div>
          )}

          <div className="flex items-center mt-2 mb-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{provider.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({provider.review_count})</span>
          </div>

          <div className="w-full text-xs text-muted-foreground mb-3">
            <div className="flex justify-between mb-1">
              <span>Experience:</span>
              <span className="font-medium text-foreground">{provider.years_experience} years</span>
            </div>
            <div className="flex justify-between">
              <span>Completed Jobs:</span>
              <span className="font-medium text-foreground">{provider.completed_jobs}</span>
            </div>
          </div>

          {provider.bio && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{provider.bio}</p>}

          <div className="grid grid-cols-2 gap-2 w-full">
            <Button size="sm" variant="outline" className="text-xs bg-transparent" asChild>
              <Link href={`/providers/${provider.id}/consultation`}>
                <Video className="h-3 w-3 mr-1" />
                Consult
              </Link>
            </Button>
            <Button size="sm" className="text-xs" asChild>
              <Link href={`/providers/${provider.id}/book`}>
                <Calendar className="h-3 w-3 mr-1" />
                Book
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
