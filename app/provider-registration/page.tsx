"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ProviderRegistrationPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profession: "",
    experience: "",
    address: "",
    city: "",
    pincode: "",
    bio: "",
    workingHours: "full-time",
    servicesOffered: [],
    idProofType: "",
    idProofNumber: "",
    bankAccountName: "",
    bankAccountNumber: "",
    ifscCode: "",
    termsAccepted: false,
  })

  const professions = [
    "Electrician",
    "Plumber",
    "House Cleaner",
    "Carpenter",
    "Painter",
    "AC Technician",
    "Appliance Repair",
    "Pest Control",
    "Gardener",
    "Other",
  ]

  const services = {
    Electrician: [
      "Electrical Wiring",
      "Switch/Socket Installation",
      "Fan Installation",
      "Light Fixture Installation",
      "Circuit Breaker Repair",
      "Emergency Electrical Services",
    ],
    Plumber: [
      "Pipe Installation",
      "Leak Repair",
      "Toilet Installation/Repair",
      "Sink Installation/Repair",
      "Water Heater Installation",
      "Emergency Plumbing Services",
    ],
    "House Cleaner": [
      "Regular Home Cleaning",
      "Deep Cleaning",
      "Kitchen Cleaning",
      "Bathroom Cleaning",
      "Carpet Cleaning",
      "Post-Construction Cleaning",
    ],
  }

  const idProofTypes = ["Aadhaar Card", "PAN Card", "Driving License", "Voter ID", "Passport"]

  const cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const services = [...prev.servicesOffered] as string[]
      if (services.includes(service)) {
        return { ...prev, servicesOffered: services.filter((s) => s !== service) }
      } else {
        return { ...prev, servicesOffered: [...services, service] }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to register the service provider
    setStep(4) // Move to success step
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Personal Information"
      case 2:
        return "Professional Details"
      case 3:
        return "Verification & Banking"
      case 4:
        return "Registration Complete"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Service Provider Registration</h1>
          <p className="text-muted-foreground">Join our network of professional service providers</p>
        </div>

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
              <div className={`h-0.5 w-16 self-center ${step >= 4 ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                4
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{getStepTitle()}</div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Provide your basic details to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.address ||
                  !formData.city ||
                  !formData.pincode
                }
              >
                Next: Professional Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>Tell us about your professional experience and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="profession">Primary Profession</Label>
                <Select value={formData.profession} onValueChange={(value) => handleSelectChange("profession", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                  <SelectContent>
                    {professions.map((profession) => (
                      <SelectItem key={profession} value={profession}>
                        {profession}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select value={formData.experience} onValueChange={(value) => handleSelectChange("experience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((year) => (
                      <SelectItem key={year.toString()} value={year.toString()}>
                        {year} {year === 1 ? "year" : "years"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about your professional background, skills, and expertise"
                  value={formData.bio}
                  onChange={handleChange}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Working Hours Preference</Label>
                <RadioGroup
                  value={formData.workingHours}
                  onValueChange={(value) => handleSelectChange("workingHours", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full-time" id="full-time" />
                    <Label htmlFor="full-time">Full-time (40+ hours/week)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="part-time" id="part-time" />
                    <Label htmlFor="part-time">Part-time (20-30 hours/week)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekends" id="weekends" />
                    <Label htmlFor="weekends">Weekends only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="flexible" />
                    <Label htmlFor="flexible">Flexible hours</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.profession && services[formData.profession as keyof typeof services] && (
                <div className="space-y-2">
                  <Label>Services Offered</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {services[formData.profession as keyof typeof services].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.servicesOffered.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <Label htmlFor={service}>{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={
                  !formData.profession || !formData.experience || !formData.bio || formData.servicesOffered.length === 0
                }
              >
                Next: Verification & Banking
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Verification & Banking</CardTitle>
              <CardDescription>Provide verification documents and banking details for payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="verification">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="verification">ID Verification</TabsTrigger>
                  <TabsTrigger value="banking">Banking Details</TabsTrigger>
                </TabsList>
                <TabsContent value="verification" className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="idProofType">ID Proof Type</Label>
                    <Select
                      value={formData.idProofType}
                      onValueChange={(value) => handleSelectChange("idProofType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID proof type" />
                      </SelectTrigger>
                      <SelectContent>
                        {idProofTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idProofNumber">ID Proof Number</Label>
                    <Input
                      id="idProofNumber"
                      name="idProofNumber"
                      value={formData.idProofNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload ID Proof (Front)</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Upload File
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Upload ID Proof (Back)</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Upload File
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="banking" className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankAccountName">Account Holder Name</Label>
                    <Input
                      id="bankAccountName"
                      name="bankAccountName"
                      value={formData.bankAccountName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankAccountNumber">Account Number</Label>
                    <Input
                      id="bankAccountNumber"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input id="ifscCode" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Cancelled Cheque or Bank Statement</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Upload File
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center space-x-2 pt-4">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked as boolean)}
                />
                <Label htmlFor="termsAccepted" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    privacy policy
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !formData.idProofType ||
                  !formData.idProofNumber ||
                  !formData.bankAccountName ||
                  !formData.bankAccountNumber ||
                  !formData.ifscCode ||
                  !formData.termsAccepted
                }
              >
                Submit Registration
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Registration Successful!</CardTitle>
              <CardDescription>Your service provider registration has been submitted successfully</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p>
                Thank you for registering as a service provider with UtilityHub. Our team will review your application
                and verify your details.
              </p>
              <p>You will receive an email notification once your account is approved, typically within 24-48 hours.</p>
              <div className="border rounded-lg p-4 bg-primary/5 text-left">
                <h3 className="font-semibold mb-2">Next Steps:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Our team will verify your documents and information</li>
                  <li>You'll receive an email with your account approval status</li>
                  <li>Once approved, you can log in and set up your provider profile</li>
                  <li>Complete the onboarding process and training</li>
                  <li>Start receiving service requests from customers</li>
                </ol>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center space-x-4">
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
