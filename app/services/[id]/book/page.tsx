"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, Clock, MapPin, User, CreditCard, Banknote, ArrowLeft } from "lucide-react"
import { fetchServiceById, type ServicePageData } from "@/lib/supabase"
import RazorpayPayment from "@/components/razorpay-payment"
import Notify from "@/components/notify"

export default function BookServicePage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.id as string

  const [service, setService] = useState<ServicePageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [showPayment, setShowPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Form data
  const [serviceDetails, setServiceDetails] = useState({
    date: "",
    time: "",
    address: "",
  })

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("online")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  const [userId, setUserId] = useState<string | undefined>(undefined)

  // Fetch session on mount
  useEffect(() => {
    const getSession = async () => {
      const { createClient } = await import("@/lib/supabase")
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setAccessToken(session.access_token)
        setUserId(session.user.id)
        // Pre-fill customer info if available
        setCustomerInfo(prev => ({
          ...prev,
          name: session.user.user_metadata.full_name || prev.name,
          email: session.user.email || prev.email,
        }))
      }
    }
    getSession()
  }, [])

  // Notification state
  const [notification, setNotification] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true)
        const serviceData = await fetchServiceById(serviceId)
        if (serviceData) {
          setService(serviceData)
        } else {
          setNotification({
            message: "Service not found",
            type: "error",
          })
        }
      } catch (error) {
        console.error("Error loading service:", error)
        setNotification({
          message: "Failed to load service details",
          type: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    if (serviceId) {
      loadService()
    }
  }, [serviceId])

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!serviceDetails.date || !serviceDetails.time || !serviceDetails.address) {
        setNotification({
          message: "Please fill in all service details",
          type: "error",
        })
        return
      }
    } else if (currentStep === 2) {
      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        setNotification({
          message: "Please fill in all customer information",
          type: "error",
        })
        return
      }
    }
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handlePayNow = () => {
    if (paymentMethod === "online") {
      setShowPayment(true)
    } else {
      // Handle cash on delivery
      handleBookingSuccess({
        paymentMethod: "cash_on_delivery",
        paymentStatus: "pending",
      })
    }
  }

  const handlePaymentSuccess = (paymentData: any) => {
    setShowPayment(false)
    console.log("[v0] Payment successful, booking confirmed")
    handleBookingSuccess({
      paymentMethod: "online",
      paymentStatus: "completed",
      paymentId: paymentData.razorpay_payment_id,
      orderId: paymentData.razorpay_order_id,
    })
  }

  const handlePaymentError = (error: any) => {
    setShowPayment(false)
    setNotification({
      message: error.message || "Payment failed. Please try again.",
      type: "error",
    })
  }

  const handleBookingSuccess = (paymentInfo: any) => {
    setIsProcessing(true)
    console.log("[v0] Booking success handler called with payment info:", paymentInfo)

    // Simulate booking creation
    setTimeout(() => {
      setNotification({
        message: "Booking confirmed successfully!",
        type: "success",
      })

      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Complete Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <RazorpayPayment
                amount={service.currentPrice}
                customerInfo={customerInfo}
                bookingData={{
                  customerName: customerInfo.name,
                  customerEmail: customerInfo.email,
                  customerPhone: customerInfo.phone,
                  serviceId: serviceId,
                  bookingDate: serviceDetails.date,
                  bookingTime: serviceDetails.time,
                  totalPrice: service.currentPrice,
                  notes: specialInstructions || undefined,
                }}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onClose={() => setShowPayment(false)}
                accessToken={accessToken}
                userId={userId}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Book {service.name}</h1>
          <p className="text-gray-600 mt-2">Complete your booking by providing the required information</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {step}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">
                  {step === 1 && "Service Details"}
                  {step === 2 && "Customer Info"}
                  {step === 3 && "Payment"}
                </span>
                {step < 3 && <div className="w-16 h-0.5 bg-gray-200 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && "Service Details"}
                  {currentStep === 2 && "Customer Information"}
                  {currentStep === 3 && "Payment & Confirmation"}
                </CardTitle>
                <p className="text-gray-600">
                  {currentStep === 1 && "When and where do you need the service?"}
                  {currentStep === 2 && "Please provide your contact information"}
                  {currentStep === 3 && "Complete your booking by providing payment information"}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Service Details */}
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={serviceDetails.date}
                          onChange={(e) => setServiceDetails({ ...serviceDetails, date: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={serviceDetails.time}
                          onChange={(e) => setServiceDetails({ ...serviceDetails, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Service Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter the complete address where service is needed"
                        value={serviceDetails.address}
                        onChange={(e) => setServiceDetails({ ...serviceDetails, address: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {/* Step 2: Customer Information */}
                {currentStep === 2 && (
                  <>
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span className="font-medium">{new Date(serviceDetails.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span className="font-medium">{serviceDetails.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Address:</span>
                          <span className="font-medium text-right max-w-xs">{serviceDetails.address}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total Amount:</span>
                            <span>₹{service.currentPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online" className="flex items-center cursor-pointer">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay Online (UPI, Card, Net Banking)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex items-center cursor-pointer">
                            <Banknote className="w-4 h-4 mr-2" />
                            Cash on Delivery
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Any special requirements for the service provider"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>
                    Back
                  </Button>
                  {currentStep < 3 ? (
                    <Button onClick={handleNextStep}>Next</Button>
                  ) : (
                    <Button onClick={handlePayNow} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
                      {isProcessing ? "Processing..." : "Pay Now"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Service Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <img
                      src={service.image || "/placeholder.svg?height=200&width=300"}
                      alt={service.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {serviceDetails.date ? new Date(serviceDetails.date).toLocaleDateString() : "Date not selected"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{serviceDetails.time || "Time not selected"}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="truncate">{serviceDetails.address || "Address not provided"}</span>
                    </div>
                    {customerInfo.name && (
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>{customerInfo.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total Amount:</span>
                      <span className="text-xl font-bold text-blue-600">₹{service.currentPrice}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <Notify message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </div>
  )
}
