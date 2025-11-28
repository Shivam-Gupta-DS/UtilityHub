import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import ServiceCard from "@/components/service-card"
import FeaturedProviders from "@/components/featured-providers"
import EmergencyServices from "@/components/emergency-services"
import Link from "next/link"

export default function HomePage() {
  // Services data - Updated with new images and pricing
  const services = [
    {
      id: "1",
      name: "Professional Home Cleaning",
      description: "Expert home cleaning services with eco-friendly products",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
      basePrice: 199,
      currentPrice: 249,
      demandLevel: "medium" as const,
    },
    {
      id: "2",
      name: "Plumbing Solutions",
      description: "Expert plumbing repair and installation services",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1000&auto=format&fit=crop",
      basePrice: 180,
      currentPrice: 180,
      demandLevel: "low" as const,
    },
    {
      id: "3",
      name: "Electrical Services",
      description: "Professional electrical services for your home and office",
      image:
        "https://media.istockphoto.com/id/1425979071/photo/maintenance-of-the-air-conditioner.webp?a=1&b=1&s=612x612&w=0&k=20&c=S9Vo80AgoCi0nHlAfkmC11u3yA0xtmg3twnpAykt2Us=",
      basePrice: 220,
      currentPrice: 320,
      demandLevel: "very-high" as const,
    },
    {
      id: "7",
      name: "Pest Control Services",
      description: "Effective pest control solutions for your home",
      image: "https://irp.cdn-website.com/23314c60/dms3rep/multi/s2+(64).jpg",
      basePrice: 170,
      currentPrice: 170,
      demandLevel: "low" as const,
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Services */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book professional services for all your home and personal needs with our verified experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </section>

      {/* Emergency Services */}
      <EmergencyServices />

      {/* Featured Providers */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Service Providers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our top-rated professionals ready to serve your needs
          </p>
        </div>

        <FeaturedProviders />

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/providers">View All Providers</Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Book services in just a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose a Service</h3>
              <p className="text-muted-foreground">Browse through our wide range of professional services</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Book an Appointment</h3>
              <p className="text-muted-foreground">Select your preferred date and time for the service</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get the Service Done</h3>
              <p className="text-muted-foreground">Our verified professional will arrive at your doorstep</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust UtilityHub for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/services">Book a Service</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/provider-registration">Become a Provider</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
