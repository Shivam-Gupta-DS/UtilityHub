"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { fetchAllServicesForPage } from "@/lib/supabase"

// Service Card Component
interface ServiceCardProps {
  service: {
    id: string
    name: string
    description: string
    image: string
    basePrice: number
    currentPrice: number
    demandLevel: "low" | "medium" | "high" | "very-high"
    category: string
    subcategory?: string
  }
}

function ServiceCard({ service }: ServiceCardProps) {
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
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">
                ₹{service.currentPrice}
                {isPriceIncreased && (
                  <span className="text-sm text-muted-foreground line-through ml-2">₹{service.basePrice}</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function ServicesPage() {
  // Categories - Removed "Repair" as requested
  const categories = ["All", "Cleaning", "Plumbing", "Electrical", "Renovation", "Beauty", "Automotive"]
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Refs for scrolling
  const womenScrollRef = useRef<HTMLDivElement>(null)
  const menScrollRef = useRef<HTMLDivElement>(null)

  // Fetch services from Supabase on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        const fetchedServices = await fetchAllServicesForPage()
        setServices(fetchedServices)
      } catch (error) {
        console.error("Error loading services:", error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  // Scroll functions
  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (!ref.current) return

    const scrollAmount = 300
    if (direction === "left") {
      ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Get 2 services from each category for the "All" tab
  const getTopServicesForAllCategory = () => {
    const mainCategories = ["Cleaning", "Plumbing", "Electrical", "Renovation", "Automotive"]
    let allCategoryServices: any[] = []

    // Handle regular categories (2 services each)
    mainCategories.forEach((category) => {
      // Get services for this category
      const categoryServices = services.filter((service) => service.category === category)

      // Take the first 2 services (or all if less than 2)
      const topServices = categoryServices.slice(0, 2)
      allCategoryServices = [...allCategoryServices, ...topServices]
    })

    // Handle Beauty category specially to include both men's and women's services
    const womenBeautyService = services.find(
      (service) => service.category === "Beauty" && service.subcategory === "Women",
    )

    const menBeautyService = services.find((service) => service.category === "Beauty" && service.subcategory === "Men")

    if (womenBeautyService) allCategoryServices.push(womenBeautyService)
    if (menBeautyService) allCategoryServices.push(menBeautyService)

    return allCategoryServices
  }

  // Filter services based on category and search query
  const filteredServices = () => {
    // If there's a search query, search across ALL services regardless of category
    if (searchQuery) {
      const searchResults = services.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      // If we're in the "All" tab, return all search results
      // If we're in a specific category tab, filter the search results by that category
      return activeCategory === "All"
        ? searchResults
        : searchResults.filter((service) => service.category === activeCategory)
    }

    // If no search query and we're in the "All" tab, show the curated selection
    if (activeCategory === "All") {
      return getTopServicesForAllCategory()
    }

    // Otherwise, show all services in the selected category
    return services.filter((service) => service.category === activeCategory)
  }

  // Filter beauty services by subcategory
  const womenBeautyServices = services.filter(
    (service) => service.category === "Beauty" && service.subcategory === "Women",
  )

  const menBeautyServices = services.filter((service) => service.category === "Beauty" && service.subcategory === "Men")

  // Show loading state
  if (loading) {
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

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse through our wide range of professional services and find the perfect match for your needs
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="flex flex-wrap h-auto mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="mb-2">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Beauty Category with Horizontal Scrolling */}
        {activeCategory === "Beauty" && (
          <TabsContent value="Beauty">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Women's Beauty Services</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => scroll(womenScrollRef, "left")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => scroll(womenScrollRef, "right")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div ref={womenScrollRef} className="flex space-x-4 pb-4">
                    {womenBeautyServices.map((service) => (
                      <div key={service.id} className="min-w-[250px] max-w-[250px]">
                        <Link href={`/services/${service.id}`}>
                          <Card className="h-full hover:shadow-md transition-shadow">
                            <div className="relative h-40 w-full">
                              <Image
                                src={service.image || "/placeholder.svg"}
                                alt={service.name}
                                fill
                                className="object-cover rounded-t-lg"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold truncate">{service.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                              <div className="mt-2 font-semibold">₹{service.currentPrice}</div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Men's Beauty Services</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => scroll(menScrollRef, "left")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => scroll(menScrollRef, "right")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div ref={menScrollRef} className="flex space-x-4 pb-4">
                    {menBeautyServices.map((service) => (
                      <div key={service.id} className="min-w-[250px] max-w-[250px]">
                        <Link href={`/services/${service.id}`}>
                          <Card className="h-full hover:shadow-md transition-shadow">
                            <div className="relative h-40 w-full">
                              <Image
                                src={service.image || "/placeholder.svg"}
                                alt={service.name}
                                fill
                                className="object-cover rounded-t-lg"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold truncate">{service.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                              <div className="mt-2 font-semibold">₹{service.currentPrice}</div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
        )}

        {/* Other Categories */}
        {activeCategory !== "Beauty" && (
          <TabsContent value={activeCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredServices().map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {filteredServices().length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No services found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>

      <div className="bg-slate-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
        <p className="text-muted-foreground mb-6">
          We offer a wide range of services beyond what's listed. Contact us for custom service requests.
        </p>
        <Button>Contact Us</Button>
      </div>
    </div>
  )
}
