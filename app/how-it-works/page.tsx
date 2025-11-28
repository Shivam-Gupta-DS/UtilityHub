import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Video, CreditCard, Star } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Search for Services",
      description: "Browse through our wide range of professional services and choose what you need.",
    },
    {
      icon: <Video className="h-10 w-10 text-primary" />,
      title: "Video Consultation",
      description: "Have a live video call with service providers to discuss your requirements before booking.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Book a Service",
      description: "Select your preferred date and time slot for the service.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Secure Payment",
      description: "Pay securely online or choose cash on delivery option.",
    },
    {
      icon: <Star className="h-10 w-10 text-primary" />,
      title: "Service & Feedback",
      description: "Receive quality service and share your feedback to help others.",
    },
  ]

  const features = [
    {
      title: "AI-Based Recommendations",
      description:
        "Our smart algorithm suggests the best service providers based on your location, ratings, and past bookings.",
    },
    {
      title: "Dynamic Pricing",
      description: "Transparent pricing that adjusts based on demand, similar to ride-sharing services.",
    },
    {
      title: "Live Video Consultation",
      description: "Talk to service providers before booking to ensure they understand your requirements.",
    },
    {
      title: "Subscription Model",
      description: "Save money with monthly service plans that offer discounts and priority booking.",
    },
    {
      title: "Emergency Services",
      description: "Get quick response for urgent service needs with our emergency service option.",
    },
    {
      title: "Verified Providers",
      description: "All service providers are background-checked and verified for your safety.",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">How UtilityHub Works</h1>
        <p className="text-xl text-muted-foreground">
          UtilityHub makes it easy to find, book, and manage professional services for all your home and personal needs.
        </p>
      </div>

      <div className="mb-20">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-1/2 -ml-0.5 w-0.5 bg-slate-200 hidden md:block"></div>
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`md:flex items-center ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="hidden md:flex md:w-0 md:flex-1 justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center z-10">
                      <span className="text-primary font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                    <div className="flex md:hidden items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <span className="text-primary font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-6 flex items-center justify-center">{step.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-16 px-4 rounded-lg mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground">
            UtilityHub offers unique features that make it stand out from traditional service marketplaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of satisfied customers who trust UtilityHub for their service needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/services">Explore Services</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/signup">Create an Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
