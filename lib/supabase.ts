import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Client-side Supabase client
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Named export for supabase client instance
export const supabase = createClient()

// Provider interface
export interface Provider {
  id: string
  name: string
  email: string
  phone: string
  image_url?: string
  bio?: string
  profession: string
  rating: number
  review_count: number
  years_experience: number
  completed_jobs: number
  location?: string
  is_verified: boolean
  is_available: boolean
  is_active: boolean
  working_hours?: string
  response_time?: string
  languages?: string[]
  certifications?: string[]
  created_at: string
  updated_at: string
}

// Service interface
export interface Service {
  id: string
  name: string
  description: string
  category: string
  base_price: number
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Service interface for the services page (with additional fields)
export interface ServicePageData {
  id: string
  name: string
  description: string
  category: string
  subcategory?: string
  image: string
  basePrice: number
  currentPrice: number
  demandLevel: "low" | "medium" | "high" | "very-high"
}

// Provider Service interface
export interface ProviderService {
  id: string
  provider_id: string
  service_id: string
  custom_price?: number
  description?: string
  is_available: boolean
  created_at: string
  updated_at: string
  service?: Service
}

// Review interface
export interface Review {
  id: string
  provider_id: string
  customer_name: string
  rating: number
  comment: string
  service_type: string
  created_at: string
}

// Portfolio interface
export interface Portfolio {
  id: string
  provider_id: string
  title: string
  description?: string
  image_url?: string
  project_date?: string
  created_at: string
}

// Booking interface
export interface Booking {
  id: string
  user_id: string
  provider_id: string
  service_id: string
  date: string
  time: string
  status: string
  created_at: string
}

// Mock data for fallback
const mockProviders: Provider[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1234567890",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    bio: "Experienced electrician with 10+ years in residential and commercial electrical work.",
    profession: "Electrician",
    rating: 4.8,
    review_count: 127,
    years_experience: 10,
    completed_jobs: 245,
    location: "New York, NY",
    is_verified: true,
    is_available: true,
    is_active: true,
    working_hours: "Mon-Fri 8AM-6PM",
    response_time: "Within 2 hours",
    languages: ["English", "Spanish"],
    certifications: ["Licensed Electrician", "OSHA Certified"],
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1234567891",
    bio: "Professional plumber specializing in emergency repairs and bathroom renovations.",
    profession: "Plumber",
    rating: 4.9,
    review_count: 89,
    years_experience: 8,
    completed_jobs: 156,
    location: "Los Angeles, CA",
    is_verified: true,
    is_available: true,
    is_active: true,
    working_hours: "24/7 Emergency Service",
    response_time: "Within 1 hour",
    languages: ["English"],
    certifications: ["Master Plumber", "Green Plumbing Certified"],
    created_at: "2023-02-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    phone: "+1234567892",
    bio: "HVAC specialist with expertise in installation, repair, and maintenance of heating and cooling systems.",
    profession: "HVAC Technician",
    rating: 4.7,
    review_count: 203,
    years_experience: 12,
    completed_jobs: 312,
    location: "Chicago, IL",
    is_verified: true,
    is_available: true,
    is_active: true,
    working_hours: "Mon-Sat 7AM-7PM",
    response_time: "Within 3 hours",
    languages: ["English"],
    certifications: ["EPA Certified", "NATE Certified"],
    created_at: "2023-03-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Lisa Chen",
    email: "lisa@example.com",
    phone: "+1234567893",
    bio: "Professional house cleaner providing thorough and reliable cleaning services for homes and offices.",
    profession: "House Cleaner",
    rating: 4.9,
    review_count: 156,
    years_experience: 6,
    completed_jobs: 423,
    location: "Miami, FL",
    is_verified: true,
    is_available: true,
    is_active: true,
    working_hours: "Mon-Fri 9AM-5PM",
    response_time: "Same day",
    languages: ["English", "Mandarin"],
    certifications: ["Bonded & Insured", "Green Cleaning Certified"],
    created_at: "2023-04-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

// Mock services data
const mockServices: Service[] = [
  {
    id: "1",
    name: "Professional Home Cleaning",
    description: "Comprehensive home cleaning service including all rooms, kitchen, and bathrooms",
    category: "Home Services",
    base_price: 299,
    image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Plumbing Solutions",
    description: "Expert plumbing services for repairs, installations, and maintenance",
    category: "Home Services",
    base_price: 199,
    image_url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1000&auto=format&fit=crop",
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Comprehensive Appliance Repair",
    description: "Professional repair services for all home appliances including AC, refrigerator, washing machine",
    category: "Home Services",
    base_price: 399,
    image_url:
      "https://media.istockphoto.com/id/1425979071/photo/maintenance-of-the-air-conditioner.webp?a=1&b=1&s=612x612&w=0&k=20&c=S9Vo80AgoCi0nHlAfkmC11u3yA0xtmg3twnpAykt2Us=",
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Interior Renovation",
    description: "Complete interior renovation and remodeling services for homes and offices",
    category: "Home Services",
    base_price: 349,
    image_url: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?q=80&w=1000&auto=format&fit=crop",
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Premium Salon Services",
    description: "Professional beauty and grooming services at your doorstep",
    category: "Beauty Services",
    base_price: 249,
    image_url: "https://mustsharenews.com/wp-content/uploads/2023/11/MSN-Featured-10.jpg",
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "Automotive Repair & Maintenance",
    description: "Complete automotive repair and maintenance services",
    category: "Automotive",
    base_price: 299,
    image_url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e",
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "7",
    name: "Pest Control Services",
    description: "Professional pest control and extermination services for homes and offices",
    category: "Home Services",
    base_price: 199,
    image_url: "https://irp.cdn-website.com/23314c60/dms3rep/multi/s2+(64).jpg",
    is_active: true,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

// Mock services page data - Updated with more services including ID 16
const mockServicesPageData: ServicePageData[] = [
  {
    id: "1",
    name: "Professional Home Cleaning",
    description: "Comprehensive home cleaning service including all rooms, kitchen, and bathrooms",
    category: "Cleaning",
    subcategory: "Home Cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
    basePrice: 299,
    currentPrice: 299,
    demandLevel: "high",
  },
  {
    id: "2",
    name: "Plumbing Solutions",
    description: "Expert plumbing services for repairs, installations, and maintenance",
    category: "Plumbing",
    subcategory: "Plumbing",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1000&auto=format&fit=crop",
    basePrice: 199,
    currentPrice: 199,
    demandLevel: "medium",
  },
  {
    id: "16",
    name: "Carpet Cleaning",
    description: "Deep cleaning for carpets and upholstery",
    category: "Cleaning",
    subcategory: "Carpet Cleaning",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1000&auto=format&fit=crop",
    basePrice: 160,
    currentPrice: 200,
    demandLevel: "medium",
  },
]

// Helper function to check if string is a valid UUID
function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

// Fetch all services for the services page
export async function fetchAllServicesForPage(): Promise<ServicePageData[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from("services_page").select("*").eq("is_active", true).order("name")

    if (error) {
      console.error("Error fetching services for page:", error)
      return mockServicesPageData // Fallback to mock data
    }

    if (!data || data.length === 0) {
      console.log("No services found in Supabase, using mock data")
      return mockServicesPageData
    }

    // Transform the data to match the expected format
    const transformedData: ServicePageData[] = data.map((service) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      category: service.category,
      subcategory: service.subcategory,
      image: service.image_url || service.image,
      basePrice: service.base_price,
      currentPrice: service.current_price,
      demandLevel: service.demand_level as "low" | "medium" | "high" | "very-high",
    }))

    return transformedData
  } catch (error) {
    console.error("Error in fetchAllServicesForPage:", error)
    return mockServicesPageData
  }
}

// Fetch top providers
export async function fetchTopProviders(limit = 4): Promise<Provider[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("providers")
      .select("*")
      .eq("is_active", true)
      .eq("is_available", true)
      .order("rating", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching top providers:", error)
      return mockProviders.slice(0, limit)
    }

    return data && data.length > 0 ? data : mockProviders.slice(0, limit)
  } catch (error) {
    console.error("Error in fetchTopProviders:", error)
    return mockProviders.slice(0, limit)
  }
}

// Fetch all providers
export async function fetchProviders(limit?: number): Promise<Provider[]> {
  try {
    const supabase = createClient()
    let query = supabase.from("providers").select("*").eq("is_active", true).order("rating", { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching providers:", error)
      return limit ? mockProviders.slice(0, limit) : mockProviders
    }

    return data && data.length > 0 ? data : limit ? mockProviders.slice(0, limit) : mockProviders
  } catch (error) {
    console.error("Error in fetchProviders:", error)
    return limit ? mockProviders.slice(0, limit) : mockProviders
  }
}

// Fetch provider by ID
export async function fetchProviderById(id: string): Promise<Provider | null> {
  try {
    // If it's not a valid UUID, return mock data
    if (!isValidUUID(id)) {
      return mockProviders.find((p) => p.id === id) || null
    }

    const supabase = createClient()
    const { data, error } = await supabase.from("providers").select("*").eq("id", id).eq("is_active", true).single()

    if (error) {
      console.error("Error fetching provider by ID:", error)
      return mockProviders.find((p) => p.id === id) || null
    }

    return data
  } catch (error) {
    console.error("Error in fetchProviderById:", error)
    return mockProviders.find((p) => p.id === id) || null
  }
}

// Fetch services by provider ID
export async function fetchServicesByProviderId(providerId: string): Promise<Service[]> {
  try {
    // Check if it's a valid UUID, if not use mock data
    if (!isValidUUID(providerId)) {
      return mockServices.filter((s) => s.provider_id === providerId)
    }

    const { data, error } = await supabase.from("services").select("*").eq("provider_id", providerId)

    if (error) {
      console.error("Error fetching services:", error)
      return mockServices.filter((s) => s.provider_id === providerId)
    }

    return data || []
  } catch (error) {
    console.error("Error in fetchServicesByProviderId:", error)
    return mockServices.filter((s) => s.provider_id === providerId)
  }
}

// Fetch service by ID - Updated to use services_page table
export async function fetchServiceById(id: string): Promise<ServicePageData | null> {
  try {
    const supabase = createClient()

    // First try to fetch from services_page table
    const { data, error } = await supabase.from("services_page").select("*").eq("id", id).eq("is_active", true).single()

    if (error) {
      console.error("Error fetching service by ID from services_page:", error)
      // Fallback to mock data
      return mockServicesPageData.find((s) => s.id === id) || null
    }

    if (data) {
      // Transform the data to match the expected format
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        category: data.category,
        subcategory: data.subcategory,
        image: data.image_url || data.image,
        basePrice: data.base_price,
        currentPrice: data.current_price,
        demandLevel: data.demand_level as "low" | "medium" | "high" | "very-high",
      }
    }

    // If no data found, try mock data
    return mockServicesPageData.find((s) => s.id === id) || null
  } catch (error) {
    console.error("Error in fetchServiceById:", error)
    return mockServicesPageData.find((s) => s.id === id) || null
  }
}

// Create booking
export async function createBooking(booking: Omit<Booking, "id" | "created_at">): Promise<Booking | null> {
  try {
    const { data, error } = await supabase.from("bookings").insert([booking]).select().single()

    if (error) {
      console.error("Error creating booking:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in createBooking:", error)
    return null
  }
}

// Fetch user bookings
export async function fetchUserBookings(userId: string): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching bookings:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in fetchUserBookings:", error)
    return []
  }
}
