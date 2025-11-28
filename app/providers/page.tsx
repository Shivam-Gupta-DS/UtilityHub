import { createClient } from "@/lib/supabase"
import ProviderCard from "@/components/provider-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { Provider } from "@/lib/supabase"

// Mock data as fallback in case database is unavailable
const mockProviders = [
  {
    id: "provider-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    bio: "Experienced electrician with 5 years of professional experience. Specializes in residential electrical work and emergency repairs.",
    profession: "Electrician",
    rating: 4.5,
    review_count: 50,
    years_experience: 5,
    completed_jobs: 120,
    location: "Mumbai, Maharashtra",
    is_verified: true,
    is_available: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "provider-2",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    phone: "+91 98765 43211",
    image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
    bio: "Licensed plumber with 7 years of experience. Expert in residential and commercial plumbing systems.",
    profession: "Plumber",
    rating: 4.8,
    review_count: 75,
    years_experience: 7,
    completed_jobs: 150,
    location: "Delhi, NCR",
    is_verified: true,
    is_available: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "provider-3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "+91 98765 43212",
    image_url: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1000&auto=format&fit=crop",
    bio: "Skilled carpenter with 3 years of experience. Specializes in custom furniture and home renovations.",
    profession: "Carpenter",
    rating: 4.2,
    review_count: 30,
    years_experience: 3,
    completed_jobs: 80,
    location: "Bangalore, Karnataka",
    is_verified: false,
    is_available: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "provider-4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+91 98765 43213",
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    bio: "Professional beauty specialist with 8 years of experience. Expert in hair styling, coloring, and beauty treatments.",
    profession: "Beauty Specialist",
    rating: 4.9,
    review_count: 95,
    years_experience: 8,
    completed_jobs: 210,
    location: "Chennai, Tamil Nadu",
    is_verified: true,
    is_available: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "provider-5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+91 98765 43214",
    image_url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1000&auto=format&fit=crop",
    bio: "Certified auto mechanic with 10 years of experience. Specializes in vehicle diagnostics and repair.",
    profession: "Auto Mechanic",
    rating: 4.7,
    review_count: 65,
    years_experience: 10,
    completed_jobs: 180,
    location: "Pune, Maharashtra",
    is_verified: true,
    is_available: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "provider-6",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+91 98765 43215",
    image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    bio: "Professional house cleaner with 4 years of experience. Known for attention to detail and eco-friendly cleaning methods.",
    profession: "House Cleaner",
    rating: 4.6,
    review_count: 55,
    years_experience: 4,
    completed_jobs: 95,
    location: "Hyderabad, Telangana",
    is_verified: true,
    is_available: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

async function fetchProviders(): Promise<Provider[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("providers")
      .select("*")
      .eq("is_active", true)
      .order("rating", { ascending: false })

    if (error) {
      console.error("Error fetching providers:", error.message)
      return mockProviders
    }

    return data || mockProviders
  } catch (error) {
    console.error("Error fetching providers:", error)
    return mockProviders
  }
}

export default async function ProvidersPage() {
  const providers = await fetchProviders()

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Service Providers</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Meet our team of verified professionals ready to serve your needs
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search providers by name or profession..."
            className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {providers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No providers found.</p>
        </div>
      )}
    </div>
  )
}
