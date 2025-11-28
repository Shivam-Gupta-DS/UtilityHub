"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Clock, Video, Calendar, ArrowRight, CheckCircle } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchServiceById, type ServicePageData } from "@/lib/supabase"

interface Provider {
  id: string
  name: string
  image: string
  profession: string
  rating: number
  reviewCount: number
  experience: string
  completedJobs: number
  isVerified: boolean
}

interface ProviderCardProps {
  provider: Provider
  onClick: () => void
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onClick }) => {
  return (
    <Card className="h-full transition-all hover:shadow-md cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={provider.image || "/placeholder.svg"}
                alt={provider.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            {provider.isVerified && <Badge className="absolute bottom-0 right-0 bg-green-500 text-xs">Verified</Badge>}
          </div>
          <h3 className="font-semibold">{provider.name}</h3>
          <p className="text-sm text-muted-foreground">{provider.profession}</p>
          <div className="flex items-center mt-1 mb-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{provider.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({provider.reviewCount})</span>
          </div>

          <div className="w-full text-xs text-muted-foreground mb-3">
            <div className="flex justify-between mb-1">
              <span>Experience:</span>
              <span className="font-medium text-foreground">{provider.experience}</span>
            </div>
            <div className="flex justify-between">
              <span>Completed Jobs:</span>
              <span className="font-medium text-foreground">{provider.completedJobs}</span>
            </div>
          </div>

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

export default function ServicePage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [service, setService] = useState<ServicePageData | null>(null)
  const [loading, setLoading] = useState(true)

  // Add provider data for all services
  const providers = [
    {
      id: "provider-1",
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1573496800636-fa583ef9ae65?q=80&w=1000&auto=format&fit=crop",
      profession: "Electrician",
      rating: 4.5,
      reviewCount: 50,
      experience: "5 years",
      completedJobs: 120,
      isVerified: true,
    },
    {
      id: "provider-2",
      name: "Alice Smith",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
      profession: "Plumber",
      rating: 4.8,
      reviewCount: 75,
      experience: "7 years",
      completedJobs: 150,
      isVerified: true,
    },
    {
      id: "provider-3",
      name: "Bob Johnson",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1000&auto=format&fit=crop",
      profession: "Carpenter",
      rating: 4.2,
      reviewCount: 30,
      experience: "3 years",
      completedJobs: 80,
      isVerified: false,
    },
    {
      id: "provider-4",
      name: "Sarah Williams",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
      profession: "Beauty Specialist",
      rating: 4.9,
      reviewCount: 95,
      experience: "8 years",
      completedJobs: 210,
      isVerified: true,
    },
    {
      id: "provider-5",
      name: "Michael Brown",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1000&auto=format&fit=crop",
      profession: "Auto Mechanic",
      rating: 4.7,
      reviewCount: 65,
      experience: "10 years",
      completedJobs: 180,
      isVerified: true,
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const serviceData = await fetchServiceById(id)
          if (serviceData) {
            setService(serviceData)
          } else {
            // Handle the case where the service is not found
            console.log(`Service with id ${id} not found`)
            setService(null) // Or set a default/fallback service
          }
        } catch (error) {
          console.error("Error fetching service:", error)
          setService(null) // Handle error appropriately
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-8 mx-auto"></div>
          <div className="h-64 w-full max-w-2xl bg-gray-200 rounded mb-4 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="container mx-auto py-12 px-4">
        <p>Service not found.</p>
      </div>
    )
  }

  const getDemandColor = () => {
    switch (service.demandLevel) {
      case "very-high":
      case "high":
        return (
          <Badge variant="destructive">
            {service.demandLevel === "very-high" ? "Very High Demand" : "High Demand"}
          </Badge>
        )
      case "medium":
        return <Badge variant="secondary">Medium Demand</Badge>
      default:
        return <Badge>Low Demand</Badge>
    }
  }

  // Get relevant providers for this service
  const getRelevantProviders = () => {
    // Match providers based on service category
    let profession = ""
    switch (service.category) {
      case "Electrical":
        profession = "Electrician"
        break
      case "Plumbing":
        profession = "Plumber"
        break
      case "Renovation":
        profession = "Carpenter"
        break
      case "Beauty":
        profession = "Beauty Specialist"
        break
      case "Automotive":
        profession = "Auto Mechanic"
        break
      default:
        profession = ""
    }

    // Filter providers by profession or return all if no match
    return providers.filter((p) => profession === "" || p.profession === profession)
  }

  const relevantProviders = getRelevantProviders()

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{service.rating}</span>
                <span className="text-muted-foreground ml-1">({service.reviewCount} reviews)</span>
              </div>
              <div className="ml-4">{getDemandColor()}</div>
            </div>
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-6">
              <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
            </div>

            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground">{service.description}</p>
              </TabsContent>

              <TabsContent value="features" className="mt-4">
                <ul className="space-y-2">
                  {service.features &&
                    service.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <p>Customer reviews will be displayed here.</p>
              </TabsContent>

              <TabsContent value="faq" className="mt-4">
                <p>Frequently asked questions will be displayed here.</p>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Recommended Providers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relevantProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onClick={() => router.push(`/providers/${provider.id}`)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Book This Service</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Price</span>
                <div>
                  <span className="text-2xl font-bold">₹{service.currentPrice}</span>
                  {service.basePrice !== service.currentPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">₹{service.basePrice}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <Button className="w-full flex items-center justify-center gap-2" asChild>
                  <Link href={`/services/${id}/book`}>
                    <Calendar className="h-4 w-4" />
                    Book Now
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 bg-transparent"
                  asChild
                >
                  <Link href={`/services/${id}/consultation`}>
                    <Video className="h-4 w-4" />
                    Video Consultation
                  </Link>
                </Button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Service Information</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Duration: 2-3 hours</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>100% satisfaction guarantee</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Link href="/subscription" className="flex items-center justify-between text-primary hover:underline">
                  <span>Save 15% with our subscription plans</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
