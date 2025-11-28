"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Clock, Video, Calendar, MapPin, CheckCircle, Phone, Mail, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase"

export default function ProviderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [provider, setProvider] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [reviewText, setReviewText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  // Mock providers data with updated image for John Doe
  const mockProviders = [
    {
      id: "provider-1",
      name: "John Doe",
      // Updated image for John Doe
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
      profession: "Electrician",
      rating: 4.5,
      reviewCount: 50,
      experience: "5 years",
      completedJobs: 120,
      isVerified: true,
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      address: "123 Main St, Delhi",
      about:
        "Experienced electrician specializing in residential and commercial electrical services. Licensed and insured with expertise in wiring, installations, repairs, and maintenance. I take pride in providing safe, reliable, and efficient electrical solutions for all your needs.",
      services: [
        "Electrical Wiring & Repairs",
        "AC Installation & Repair",
        "Ceiling Fan Installation",
        "Comprehensive Appliance Repair",
      ],
      certifications: [
        "Certified Electrical Technician",
        "Licensed Electrician - Delhi",
        "Safety Standards Certification",
        "Energy Efficiency Specialist",
      ],
      workingHours: "Monday to Saturday, 9:00 AM - 7:00 PM",
      responseTime: "Usually responds within 1 hour",
      languages: ["English", "Hindi"],
      // Portfolio of previous work
      portfolio: [
        {
          id: "p1",
          title: "Commercial Wiring Project",
          description: "Complete electrical wiring for a new office building",
          image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop",
          date: "March 2023",
        },
        {
          id: "p2",
          title: "Home Automation Setup",
          description: "Smart home installation with automated lighting and security",
          image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop",
          date: "January 2023",
        },
        {
          id: "p3",
          title: "Emergency Electrical Repair",
          description: "Urgent repair of electrical panel after storm damage",
          image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
          date: "December 2022",
        },
        {
          id: "p4",
          title: "Ceiling Fan Installation",
          description: "Installation of decorative ceiling fans in a restaurant",
          image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
          date: "October 2022",
        },
      ],
      // Detailed reviews
      reviews: [
        {
          id: "r1",
          user: "Rahul Sharma",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop",
          rating: 5,
          date: "April 15, 2023",
          text: "John did an excellent job installing my ceiling fan. He was punctual, professional, and cleaned up after the work was done. Highly recommend his services!",
          service: "Ceiling Fan Installation",
        },
        {
          id: "r2",
          user: "Priya Patel",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
          rating: 4,
          date: "March 22, 2023",
          text: "Very knowledgeable electrician. Fixed our electrical issues efficiently. Only giving 4 stars because he arrived a bit late, but the work quality was excellent.",
          service: "Electrical Wiring & Repairs",
        },
        {
          id: "r3",
          user: "Amit Kumar",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
          rating: 5,
          date: "February 10, 2023",
          text: "John installed our new AC unit perfectly. He explained everything clearly and even gave us tips on maintenance. Very satisfied with his service.",
          service: "AC Installation & Repair",
        },
        {
          id: "r4",
          user: "Neha Singh",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
          rating: 4,
          date: "January 5, 2023",
          text: "Good service overall. Fixed our refrigerator quickly and efficiently. Would use his services again.",
          service: "Comprehensive Appliance Repair",
        },
        {
          id: "r5",
          user: "Vikram Mehta",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
          rating: 5,
          date: "December 18, 2022",
          text: "Excellent service! John rewired our entire kitchen and did a fantastic job. Very professional and knowledgeable.",
          service: "Electrical Wiring & Repairs",
        },
      ],
      // Rating breakdown
      ratingBreakdown: {
        5: 30,
        4: 15,
        3: 3,
        2: 1,
        1: 1,
      },
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
      email: "alice.smith@example.com",
      phone: "+91 9876543211",
      address: "456 Park Ave, Delhi",
      about:
        "Professional plumber with extensive experience in residential and commercial plumbing. Specializing in repairs, installations, and maintenance of all plumbing systems.",
      services: ["Plumbing Solutions", "Drain Cleaning", "Water Heater Installation"],
      portfolio: [
        {
          id: "p1",
          title: "Bathroom Plumbing Installation",
          description: "Complete plumbing installation for a new bathroom",
          image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1000&auto=format&fit=crop",
          date: "April 2023",
        },
        {
          id: "p2",
          title: "Kitchen Sink Replacement",
          description: "Removal and installation of new kitchen sink and fixtures",
          image: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1000&auto=format&fit=crop",
          date: "February 2023",
        },
      ],
      reviews: [
        {
          id: "r1",
          user: "Vikram Singh",
          avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1000&auto=format&fit=crop",
          rating: 5,
          date: "May 10, 2023",
          text: "Alice did a fantastic job fixing our leaky pipes. Very professional and knowledgeable.",
          service: "Plumbing Solutions",
        },
        {
          id: "r2",
          user: "Meera Kapoor",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
          rating: 4,
          date: "April 5, 2023",
          text: "Good service, fixed our drain quickly. Slightly expensive but worth it for the quality.",
          service: "Drain Cleaning",
        },
      ],
      ratingBreakdown: {
        5: 45,
        4: 20,
        3: 8,
        2: 2,
        1: 0,
      },
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
      email: "bob.johnson@example.com",
      phone: "+91 9876543212",
      address: "789 Lake View, Delhi",
      about:
        "Skilled carpenter with expertise in custom furniture making, repairs, and installations. Specializing in woodworking and cabinetry for residential and commercial spaces.",
      services: ["Carpentry & Furniture Repair", "Interior Renovation", "Kitchen Renovation", "Bathroom Renovation"],
      portfolio: [
        {
          id: "p1",
          title: "Custom Bookshelf",
          description: "Built and installed a custom floor-to-ceiling bookshelf",
          image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop",
          date: "March 2023",
        },
      ],
      reviews: [
        {
          id: "r1",
          user: "Arjun Reddy",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
          rating: 4,
          date: "April 20, 2023",
          text: "Bob built a beautiful custom table for our dining room. Great craftsmanship.",
          service: "Carpentry & Furniture Repair",
        },
      ],
      ratingBreakdown: {
        5: 10,
        4: 15,
        3: 3,
        2: 2,
        1: 0,
      },
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
      email: "sarah.williams@example.com",
      phone: "+91 9876543213",
      address: "101 Beauty Blvd, Delhi",
      about:
        "Professional beauty specialist with expertise in hair styling, makeup, and skincare. Certified in various beauty techniques and committed to providing exceptional service.",
      services: [
        "Women's Hair Styling",
        "Women's Hair Coloring",
        "Women's Facial Treatment",
        "Women's Makeup Services",
        "Women's Manicure & Pedicure",
      ],
      portfolio: [
        {
          id: "p1",
          title: "Bridal Makeup",
          description: "Complete bridal makeup and hair styling for a wedding",
          image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000&auto=format&fit=crop",
          date: "May 2023",
        },
        {
          id: "p2",
          title: "Hair Transformation",
          description: "Complete hair color transformation from dark to blonde",
          image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
          date: "April 2023",
        },
      ],
      reviews: [
        {
          id: "r1",
          user: "Ananya Sharma",
          avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1000&auto=format&fit=crop",
          rating: 5,
          date: "May 15, 2023",
          text: "Sarah did my makeup for my wedding and I couldn't be happier! Everyone loved it.",
          service: "Women's Makeup Services",
        },
      ],
      ratingBreakdown: {
        5: 75,
        4: 15,
        3: 5,
        2: 0,
        1: 0,
      },
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
      email: "michael.brown@example.com",
      phone: "+91 9876543214",
      address: "202 Auto Lane, Delhi",
      about:
        "Certified auto mechanic with extensive experience in vehicle repair and maintenance. Specializing in diagnostics, engine repair, and preventive maintenance for all vehicle makes and models.",
      services: ["Automotive Repair & Maintenance", "Car Detailing"],
      portfolio: [
        {
          id: "p1",
          title: "Engine Rebuild",
          description: "Complete engine rebuild for a classic car",
          image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop",
          date: "March 2023",
        },
      ],
      reviews: [
        {
          id: "r1",
          user: "Rajesh Kumar",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
          rating: 5,
          date: "April 10, 2023",
          text: "Michael did an excellent job servicing my car. Very thorough and professional.",
          service: "Automotive Repair & Maintenance",
        },
      ],
      ratingBreakdown: {
        5: 40,
        4: 20,
        3: 5,
        2: 0,
        1: 0,
      },
    },
    {
      id: "provider-6",
      name: "Emily Davis",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
      profession: "House Cleaner",
      rating: 4.6,
      reviewCount: 55,
      experience: "4 years",
      completedJobs: 95,
      isVerified: true,
      email: "emily.davis@example.com",
      phone: "+91 9876543215",
      address: "303 Clean St, Delhi",
      about:
        "Professional house cleaner with expertise in deep cleaning, organization, and maintenance. Committed to providing thorough and efficient cleaning services for homes and offices.",
      services: ["Professional Home Cleaning", "Deep Cleaning Services", "Carpet Cleaning", "Pest Control Services"],
      portfolio: [
        {
          id: "p1",
          title: "Move-out Cleaning",
          description: "Complete deep cleaning of a 3-bedroom apartment for move-out",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
          date: "May 2023",
        },
      ],
      reviews: [
        {
          id: "r1",
          user: "Sanjay Gupta",
          avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop",
          rating: 5,
          date: "May 5, 2023",
          text: "Emily did an amazing job cleaning our home. Very thorough and detail-oriented.",
          service: "Professional Home Cleaning",
        },
      ],
      ratingBreakdown: {
        5: 35,
        4: 15,
        3: 5,
        2: 0,
        1: 0,
      },
    },
  ]

  useEffect(() => {
    async function fetchProviderData() {
      if (!id) return

      try {
        const supabase = createClient()
        setLoading(true)

        // First try to fetch from Supabase

        const { data: providerData, error } = await supabase.from("providers").select("*").eq("id", id).single()

        if (error) {
          console.error("Error fetching provider:", error)
          // Fall back to mock data
          const foundProvider = mockProviders.find((p) => p.id === id)
          if (foundProvider) {
            setProvider(foundProvider)
          } else {
            // Create a fallback provider for any ID to prevent 404 errors
            const fallbackProvider = {
              id: id,
              name: `Provider ${id}`,
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
              profession: "Service Professional",
              rating: 4.5,
              reviewCount: 50,
              experience: "5 years",
              completedJobs: 120,
              isVerified: true,
              email: "provider@example.com",
              phone: "+91 9876543210",
              address: "123 Main St, Delhi",
              about: "Professional service provider with years of experience in the industry.",
              services: ["Professional Services"],
              workingHours: "Monday to Saturday, 9:00 AM - 7:00 PM",
              responseTime: "Usually responds within 1 hour",
              languages: ["English", "Hindi"],
              portfolio: [],
              reviews: [],
              ratingBreakdown: {
                5: 30,
                4: 15,
                3: 3,
                2: 1,
                1: 1,
              },
            }
            setProvider(fallbackProvider)
          }
        } else {
          // Transform Supabase data to match our component structure
          const transformedProvider = {
            id: providerData.id,
            name: providerData.name,
            image: providerData.image_url,
            profession: providerData.profession,
            rating: providerData.rating || 4.5,
            reviewCount: providerData.review_count || 0,
            experience: `${providerData.years_experience} years`,
            completedJobs: providerData.completed_jobs || 0,
            isVerified: providerData.is_verified,
            email: providerData.email,
            phone: providerData.phone,
            address: providerData.location,
            about: providerData.bio || "Professional service provider with years of experience in the industry.",
            services: ["Professional Services"], // This would need to be fetched from provider_services table
            workingHours: providerData.working_hours || "Monday to Saturday, 9:00 AM - 7:00 PM",
            responseTime: providerData.response_time || "Usually responds within 1 hour",
            languages: providerData.languages || ["English", "Hindi"],
            portfolio: [], // This would need to be fetched from portfolio table
            reviews: [], // This would need to be fetched from reviews table
            ratingBreakdown: {
              5: 30,
              4: 15,
              3: 3,
              2: 1,
              1: 1,
            },
          }
          setProvider(transformedProvider)
        }
      } catch (error) {
        console.error("Error fetching provider data:", error)
        // Fall back to mock data
        const foundProvider = mockProviders.find((p) => p.id === id)
        if (foundProvider) {
          setProvider(foundProvider)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProviderData()
  }, [id])

  const handleRatingChange = (value: string) => {
    setUserRating(Number.parseInt(value))
  }

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userRating) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to save the review
      console.log("Review submitted:", { rating: userRating, text: reviewText })

      setIsSubmitting(false)
      setReviewSubmitted(true)

      // Reset form
      setTimeout(() => {
        setUserRating(null)
        setReviewText("")
        setReviewSubmitted(false)
      }, 3000)
    }, 1000)
  }

  // Calculate rating percentages for the breakdown
  const calculateRatingPercentage = (rating: number) => {
    if (!provider?.ratingBreakdown) return 0
    const totalReviews = Object.values(provider.ratingBreakdown).reduce((a: any, b: any) => a + b, 0)
    return ((provider.ratingBreakdown[rating] / (totalReviews as number)) * 100)
  }

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

  if (!provider) {
    return null
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Provider Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative h-32 w-32 rounded-full overflow-hidden">
              <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-cover" />
              {provider.isVerified && <Badge className="absolute bottom-2 right-2 bg-green-500">Verified</Badge>}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
              <p className="text-lg text-muted-foreground mb-2">{provider.profession}</p>
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{provider.rating}</span>
                <span className="text-muted-foreground ml-1">({provider.reviewCount} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>{provider.experience} Experience</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>{provider.completedJobs} Jobs Completed</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="w-full">
              <TabsTrigger value="about" className="flex-1">
                About
              </TabsTrigger>
              <TabsTrigger value="services" className="flex-1">
                Services
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="flex-1">
                Portfolio
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About {provider.name}</h2>
                  <p className="text-muted-foreground mb-6">{provider.about}</p>

                  {provider.certifications && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                      <ul className="space-y-2">
                        {provider.certifications.map((cert: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                      <span>{provider.email}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                      <span>{provider.address}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Working Hours</h3>
                      <p className="text-muted-foreground">
                        {provider.workingHours || "Monday to Saturday, 9:00 AM - 7:00 PM"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Response Time</h3>
                      <p className="text-muted-foreground">
                        {provider.responseTime || "Usually responds within 1 hour"}
                      </p>
                    </div>
                  </div>

                  {provider.languages && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {provider.languages.map((lang: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
                  <ul className="space-y-3">
                    {provider.services.map((service: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    {/* Overall Rating */}
                    <div className="md:w-1/3 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Overall Rating</h3>
                      <div className="text-5xl font-bold text-center mb-2">{provider.rating}</div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${star <= Math.round(provider.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Based on {provider.reviewCount} reviews</p>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
                      {provider.ratingBreakdown &&
                        [5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center mb-2">
                            <div className="w-12 text-sm font-medium">{rating} stars</div>
                            <div className="w-full mx-4">
                              <Progress value={calculateRatingPercentage(rating)} className="h-2" />
                            </div>
                            <div className="w-12 text-sm text-right">{provider.ratingBreakdown[rating]}</div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Write a Review */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                    {reviewSubmitted ? (
                      <div className="bg-green-50 text-green-600 p-4 rounded-md">
                        Thank you for your review! Your feedback helps others make informed decisions.
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                          <Label className="mb-2 block">Your Rating</Label>
                          <RadioGroup
                            value={userRating?.toString() || ""}
                            onValueChange={handleRatingChange}
                            className="flex space-x-2"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div key={rating} className="flex flex-col items-center">
                                <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} className="sr-only" />
                                <Label
                                  htmlFor={`rating-${rating}`}
                                  className={`cursor-pointer p-2 ${
                                    userRating === rating ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
                                  }`}
                                >
                                  <Star className={`h-8 w-8 ${userRating === rating ? "fill-yellow-400" : ""}`} />
                                </Label>
                                <span className="text-xs">{rating}</span>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div className="mb-4">
                          <Label htmlFor="review" className="mb-2 block">
                            Your Review
                          </Label>
                          <Textarea
                            id="review"
                            placeholder="Share your experience with this service provider..."
                            rows={4}
                            value={reviewText}
                            onChange={handleReviewTextChange}
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={!userRating || isSubmitting}
                          className="flex items-center gap-2"
                        >
                          <Send className="h-4 w-4" />
                          {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </form>
                    )}
                  </div>

                  <Separator className="my-6" />

                  {/* Customer Reviews */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                    {provider.reviews ? (
                      <div className="space-y-6">
                        {provider.reviews.map((review: any) => (
                          <div key={review.id} className="border-b pb-6 last:border-0">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                                <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold">{review.user}</h4>
                                    <div className="flex items-center mt-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div className="text-sm text-muted-foreground">{review.date}</div>
                                </div>
                                <div className="mt-2">
                                  <Badge variant="outline" className="mb-2">
                                    {review.service}
                                  </Badge>
                                  <p className="text-muted-foreground">{review.text}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No reviews yet. Be the first to review this provider!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Work Portfolio</h2>
                  {provider.portfolio ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {provider.portfolio.map((item: any) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                          <div className="relative h-48 w-full">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No portfolio items available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          {/* Booking Card */}
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Book {provider.name}</h3>

              <div className="space-y-4 mb-6">
                <Button className="w-full flex items-center justify-center gap-2" asChild>
                  <Link href={`/providers/${id}/book`}>
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 bg-transparent"
                  asChild
                >
                  <Link href={`/providers/${id}/consultation`}>
                    <Video className="h-4 w-4" />
                    Video Consultation
                  </Link>
                </Button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Availability</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Available: {provider.workingHours || "Mon-Sat, 9:00 AM - 7:00 PM"}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{provider.responseTime || "Usually responds within 1 hour"}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
