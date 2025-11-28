"use client"

import type React from "react"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { CalendarIcon, Clock, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

export default function ProviderConsultationPage() {
  const params = useParams()
  const id = params?.id as string
  const [provider, setProvider] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState("")
  const [step, setStep] = useState(1)

  // Mock providers data
  const providers = [
    {
      id: "provider-1",
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1573496800636-fa583ef9ae65?q=80&w=1000&auto=format&fit=crop",
      profession: "Electrician",
    },
    {
      id: "provider-2",
      name: "Alice Smith",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
      profession: "Plumber",
    },
    {
      id: "provider-3",
      name: "Bob Johnson",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1000&auto=format&fit=crop",
      profession: "Carpenter",
    },
    {
      id: "provider-4",
      name: "Sarah Williams",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
      profession: "Beauty Specialist",
    },
    {
      id: "provider-5",
      name: "Michael Brown",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1000&auto=format&fit=crop",
      profession: "Auto Mechanic",
    },
    {
      id: "provider-6",
      name: "Emily Davis",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
      profession: "House Cleaner",
    },
  ]

  const timeSlots = [
    "09:00 AM - 09:30 AM",
    "10:00 AM - 10:30 AM",
    "11:00 AM - 11:30 AM",
    "12:00 PM - 12:30 PM",
    "02:00 PM - 02:30 PM",
    "03:00 PM - 03:30 PM",
    "04:00 PM - 04:30 PM",
    "05:00 PM - 05:30 PM",
  ]

  useEffect(() => {
    if (id) {
      // Find the provider by ID
      const foundProvider = providers.find((p) => p.id === id)

      if (foundProvider) {
        setProvider(foundProvider)
      } else {
        // Create a fallback provider for any ID to prevent 404 errors
        const fallbackProvider = {
          id: id,
          name: `Provider ${id}`,
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
          profession: "Service Professional",
        }
        setProvider(fallbackProvider)
      }

      setLoading(false)
    }
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3) // Move to confirmation step
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Book Video Consultation with {provider.name}</h1>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                1
              </div>
              <div className={`h-0.5 w-16 self-center ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                2
              </div>
              <div className={`h-0.5 w-16 self-center ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                3
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {step === 1 && "Schedule Consultation"}
              {step === 2 && "Consultation Details"}
              {step === 3 && "Confirmation"}
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule Your Consultation</CardTitle>
              <CardDescription>Choose a date and time for your video consultation with {provider.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.profession}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        // Disable dates in the past
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Time Slot</Label>
                <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <div key={slot} className="flex items-center space-x-2">
                      <RadioGroupItem value={slot} id={slot} />
                      <Label htmlFor={slot} className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        {slot}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/providers/${id}`}>Back</Link>
              </Button>
              <Button onClick={() => setStep(2)} disabled={!date || !timeSlot}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
              <CardDescription>Provide additional information for your consultation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4 bg-muted/20">
                <h3 className="font-semibold mb-2">Consultation Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Provider:</span>
                    <span>
                      {provider.name} ({provider.profession})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{date ? format(date, "PPP") : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{timeSlot}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Consultation Fee:</span>
                      <span>₹199</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Describe your requirements</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe what you'd like to discuss during the consultation..."
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Confirm Consultation</Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Consultation Confirmed!</CardTitle>
              <CardDescription>Your video consultation has been successfully scheduled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Consultation Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking ID:</span>
                    <span>VC{Math.floor(Math.random() * 10000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Provider:</span>
                    <span>
                      {provider.name} ({provider.profession})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{date ? format(date, "PPP") : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{timeSlot}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Consultation Fee:</span>
                      <span>₹199</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p>A confirmation has been sent to your email and phone number.</p>
                <p className="text-muted-foreground">
                  You will receive a video call link 15 minutes before the scheduled time.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard">View My Bookings</Link>
              </Button>
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
