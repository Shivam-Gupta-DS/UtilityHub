"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Calendar, Video } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { fetchTopProviders, type Provider } from "@/lib/supabase"

export default function FeaturedProviders() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)

  // Fallback providers data
  const fallbackProviders: Provider[] = [
    {
      id: "provider-1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 98765 43210",
      image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
      bio: "Experienced electrician with 5 years of professional experience. Specializes in residential electrical work and emergency repairs.",
      profession: "Electrician",
      rating: 4.5,
      review_count: 50,
      years_experience: 5,
      completed_jobs: 120,
      location: "Mumbai, Maharashtra",
      is_verified: true,
      is_available: true,
      is_active: true,
      working_hours: "9 AM - 6 PM",
      response_time: "Within 2 hours",
      languages: ["English", "Hindi"],
      certifications: ["Licensed Electrician"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "provider-2",
      name: "Alice Smith",
      email: "alice.smith@example.com",
      phone: "+91 98765 43211",
      image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
      bio: "Licensed plumber with 7 years of experience. Expert in residential and commercial plumbing systems.",
      profession: "Plumber",
      rating: 4.8,
      review_count: 75,
      years_experience: 7,
      completed_jobs: 150,
      location: "Delhi, NCR",
      is_verified: true,
      is_available: true,
      is_active: true,
      working_hours: "8 AM - 7 PM",
      response_time: "Within 3 hours",
      languages: ["English", "Hindi"],
      certifications: ["Licensed Plumber"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "provider-3",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+91 98765 43213",
      image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
      bio: "Professional beauty specialist with 8 years of experience. Expert in hair styling, coloring, and beauty treatments.",
      profession: "Beauty Specialist",
      rating: 4.9,
      review_count: 95,
      years_experience: 8,
      completed_jobs: 210,
      location: "Chennai, Tamil Nadu",
      is_verified: true,
      is_available: true,
      is_active: true,
      working_hours: "10 AM - 8 PM",
      response_time: "Within 1 hour",
      languages: ["English", "Tamil"],
      certifications: ["Certified Beauty Specialist"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "provider-4",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+91 98765 43214",
      image_url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1000&auto=format&fit=crop",
      bio: "Certified auto mechanic with 10 years of experience. Specializes in vehicle diagnostics and repair.",
      profession: "Auto Mechanic",
      rating: 4.7,
      review_count: 65,
      years_experience: 10,
      completed_jobs: 180,
      location: "Pune, Maharashtra",
      is_verified: true,
      is_available: true,
      is_active: true,
      working_hours: "9 AM - 6 PM",
      response_time: "Within 4 hours",
      languages: ["English", "Marathi"],
      certifications: ["ASE Certified Mechanic"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  useEffect(() => {
    async function loadProviders() {
      try {
        setLoading(true)
        const data = await fetchTopProviders(4)

        if (data && data.length > 0) {
          setProviders(data)
        } else {
          // Use fallback data if no providers found
          setProviders(fallbackProviders)
        }
      } catch (error) {
        console.error("Error loading providers:", error)
        // Use fallback data on error
        setProviders(fallbackProviders)
      } finally {
        setLoading(false)
      }
    }

    loadProviders()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                  <div className="flex space-x-2 w-full">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {providers.map((provider) => (
        <Card key={provider.id} className="h-full transition-all hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={provider.image_url || "/placeholder.svg?height=64&width=64"}
                    alt={provider.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {provider.is_verified && (
                  <Badge className="absolute bottom-0 right-0 bg-green-500 text-xs">Verified</Badge>
                )}
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

              {/* <div className="grid grid-cols-2 gap-2 w-full">
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
              </div> */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
