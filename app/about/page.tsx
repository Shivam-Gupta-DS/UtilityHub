import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Clock, ThumbsUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { label: "Service Providers", value: "500+" },
    { label: "Cities Covered", value: "20+" },
    { label: "Happy Customers", value: "10,000+" },
    { label: "Services Completed", value: "25,000+" },
  ]

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Trust & Safety",
      description: "We verify all service providers and ensure your safety is our top priority.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Reliability",
      description: "Punctual service delivery and timely responses to all your needs.",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Quality",
      description: "We maintain high standards and ensure quality service every time.",
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-primary" />,
      title: "Customer Satisfaction",
      description: "Your satisfaction is our ultimate goal and drives everything we do.",
    },
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With over 15 years of experience in the service industry, Rajesh founded UtilityHub to revolutionize how people access home services.",
    },
    {
      name: "Priya Singh",
      role: "Chief Technology Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Priya leads our technology team, bringing her expertise in AI and machine learning to create innovative solutions for service matching.",
    },
    {
      name: "Amit Patel",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Amit ensures smooth operations across all cities, managing our growing network of service providers and maintaining service quality.",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">About UtilityHub</h1>
        <p className="text-xl text-muted-foreground">
          We're on a mission to transform how people access and book professional services, making it more transparent,
          convenient, and reliable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2023, UtilityHub was born out of a simple frustration: the difficulty in finding reliable service
            providers for home and personal needs. Our founder, Rajesh Kumar, experienced this firsthand when trying to
            find a reliable plumber during an emergency.
          </p>
          <p className="text-muted-foreground mb-4">
            What started as a simple directory of verified service providers has now evolved into a comprehensive
            platform with AI-powered recommendations, live video consultations, and a subscription model that benefits
            both customers and service providers.
          </p>
          <p className="text-muted-foreground">
            Today, UtilityHub serves over 10,000 customers across 20+ cities in India, with a network of 500+ verified
            service providers delivering quality services every day.
          </p>
        </div>
        <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=600&width=800" alt="UtilityHub team" fill className="object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground">These core principles guide everything we do at UtilityHub.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-muted-foreground">Meet the people driving UtilityHub's mission forward.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary mb-2">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals who are passionate about transforming the service industry.
          Check out our open positions.
        </p>
        <Button size="lg" asChild>
          <Link href="/careers">View Open Positions</Link>
        </Button>
      </div>
    </div>
  )
}
