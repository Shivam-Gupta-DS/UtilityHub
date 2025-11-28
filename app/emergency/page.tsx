"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    serviceType: "",
    address: "",
    addressDetails: "",
    contactNumber: "",
    emergencyDetails: "",
    paymentMethod: "card",
  })

  const emergencyServices = [
    { id: "plumbing", name: "Emergency Plumbing", eta: "30 min", price: 999 },
    { id: "electrical", name: "Emergency Electrical", eta: "25 min", price: 1199 },
    { id: "locksmith", name: "Emergency Locksmith", eta: "20 min", price: 899 },
    { id: "appliance", name: "Emergency Appliance Repair", eta: "45 min", price: 1299 },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to request emergency service
    setStep(2) // Move to confirmation step
  }

  const selectedService = emergencyServices.find((service) => service.id === formData.serviceType)

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-3xl font-bold">Emergency Services</h1>
        </div>

        {step === 1 && (
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle>Request Emergency Service</CardTitle>
              <CardDescription>Get quick assistance for urgent service needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Emergency Service Type</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => handleSelectChange("serviceType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {emergencyServices.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} (ETA: {service.eta})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Service Address</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressDetails">Address Details (Optional)</Label>
                <Textarea
                  id="addressDetails"
                  name="addressDetails"
                  placeholder="Apartment number, gate code, or special instructions"
                  value={formData.addressDetails}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="Enter your phone number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyDetails">Emergency Details</Label>
                <Textarea
                  id="emergencyDetails"
                  name="emergencyDetails"
                  placeholder="Describe your emergency situation in detail"
                  value={formData.emergencyDetails}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleRadioChange("paymentMethod", value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              {selectedService && (
                <div className="border rounded-lg p-4 bg-red-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{selectedService.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Estimated arrival: {selectedService.eta}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{selectedService.price}</div>
                      <div className="text-xs text-muted-foreground">Emergency fee included</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={handleSubmit}
                disabled={
                  !formData.serviceType || !formData.address || !formData.contactNumber || !formData.emergencyDetails
                }
              >
                Request Emergency Service
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle>Emergency Service Requested</CardTitle>
              <CardDescription>Help is on the way!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {selectedService && (
                <div className="border rounded-lg p-6 bg-red-50">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold">{selectedService.name}</h3>
                    <p className="text-muted-foreground">A service provider is on the way to your location</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-md mb-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-red-500 mr-2" />
                      <div>
                        <div className="font-semibold">Estimated Arrival Time</div>
                        <div className="text-sm text-muted-foreground">Within {selectedService.eta}</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-red-500">{selectedService.eta}</div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span>{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span>{formData.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contact:</span>
                      <span>{formData.contactNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span>
                        {formData.paymentMethod === "card" && "Credit/Debit Card"}
                        {formData.paymentMethod === "upi" && "UPI Payment"}
                        {formData.paymentMethod === "cod" && "Cash on Delivery"}
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount:</span>
                        <span>₹{selectedService.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Service Provider Details</h3>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-slate-200 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium">Rahul Sharma</div>
                    <div className="text-sm text-muted-foreground">Emergency Technician</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Provider
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Track Location
                  </Button>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p>A confirmation has been sent to your phone number.</p>
                <p className="text-muted-foreground">Our service provider will call you before arrival.</p>
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
