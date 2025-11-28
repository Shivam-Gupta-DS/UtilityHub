"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, Calendar, MapPin, CheckCircle, XCircle, BarChart3, Users, Settings, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated or not an admin
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login?callbackUrl=/admin")
      } else if (user.role !== "admin") {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, router])

  // Mock data for bookings
  const [bookings, setBookings] = useState([
    {
      id: "1",
      user: "John Doe",
      service: "Home Cleaning",
      provider: "Priya Patel",
      status: "pending",
      date: "2025-03-20",
      time: "10:00 AM",
      price: 599,
      address: "123 Main St, Delhi",
    },
    {
      id: "2",
      user: "Jane Smith",
      service: "Electrical Work",
      provider: "Rahul Sharma",
      status: "confirmed",
      date: "2025-03-18",
      time: "02:00 PM",
      price: 699,
      address: "456 Park Ave, Delhi",
    },
    {
      id: "3",
      user: "Amit Kumar",
      service: "Plumbing",
      provider: "Suresh Patel",
      status: "completed",
      date: "2025-03-15",
      time: "11:30 AM",
      price: 399,
      address: "789 Lake View, Delhi",
    },
  ])

  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      bookings: 5,
      subscription: "Premium",
      joinedDate: "2025-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9876543211",
      bookings: 3,
      subscription: "Basic",
      joinedDate: "2025-02-10",
    },
    {
      id: "3",
      name: "Amit Kumar",
      email: "amit@example.com",
      phone: "+91 9876543212",
      bookings: 2,
      subscription: "None",
      joinedDate: "2025-03-05",
    },
  ])

  // Mock data for providers
  const [providers, setProviders] = useState([
    {
      id: "1",
      name: "Rahul Sharma",
      profession: "Electrician",
      phone: "+91 9876543213",
      rating: 4.9,
      completedJobs: 124,
      status: "active",
      joinedDate: "2024-11-20",
    },
    {
      id: "2",
      name: "Priya Patel",
      profession: "House Cleaner",
      phone: "+91 9876543214",
      rating: 4.8,
      completedJobs: 98,
      status: "active",
      joinedDate: "2024-12-15",
    },
    {
      id: "3",
      name: "Suresh Patel",
      profession: "Plumber",
      phone: "+91 9876543215",
      rating: 4.7,
      completedJobs: 87,
      status: "inactive",
      joinedDate: "2025-01-10",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "confirmed":
        return <Badge className="bg-blue-500">Confirmed</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-500">Inactive</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const approveBooking = (id: string) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: "confirmed" } : booking)))
  }

  const rejectBooking = (id: string) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: "cancelled" } : booking)))
  }

  if (isLoading || !user || user.role !== "admin") {
    return <div className="container mx-auto py-12 px-4">Loading...</div>
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" size="icon" className="mr-2">
            <Settings className="h-4 w-4" />
          </Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Service Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providers.length}</div>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="providers" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Service Providers
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Manage Bookings</CardTitle>
              <CardDescription>View and manage all service bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search bookings..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{booking.service}</h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Customer: {booking.user}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Provider: {booking.provider}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {booking.date}, {booking.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.address}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                      <div className="font-semibold">₹{booking.price}</div>
                      <div className="flex gap-2 mt-2">
                        {booking.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => approveBooking(booking.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => rejectBooking(booking.id)}
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>View and manage customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by subscription" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="none">No Subscription</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>{user.email}</div>
                        <div>{user.phone}</div>
                        <div>Joined: {user.joinedDate}</div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                      <div>
                        <Badge className={user.subscription !== "None" ? "bg-primary" : "bg-slate-500"}>
                          {user.subscription}
                        </Badge>
                      </div>
                      <div className="text-sm mt-2">
                        <span className="text-muted-foreground">Bookings: </span>
                        <span className="font-medium">{user.bookings}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="destructive" size="sm">
                          Suspend
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers">
          <Card>
            <CardHeader>
              <CardTitle>Manage Service Providers</CardTitle>
              <CardDescription>View and manage service provider accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search providers..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Professions</SelectItem>
                    <SelectItem value="electrician">Electrician</SelectItem>
                    <SelectItem value="plumber">Plumber</SelectItem>
                    <SelectItem value="cleaner">House Cleaner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {providers.map((provider) => (
                  <div key={provider.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{provider.name}</h3>
                        {getStatusBadge(provider.status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Profession: {provider.profession}</div>
                        <div>Phone: {provider.phone}</div>
                        <div>Joined: {provider.joinedDate}</div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{provider.rating}</span>
                      </div>
                      <div className="text-sm mt-2">
                        <span className="text-muted-foreground">Completed Jobs: </span>
                        <span className="font-medium">{provider.completedJobs}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {provider.status === "active" ? (
                          <Button variant="destructive" size="sm">
                            Deactivate
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="text-green-500 border-green-500">
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>View business metrics and performance data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Booking Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-slate-100 rounded-md">
                      <p className="text-muted-foreground">Booking trend chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-slate-100 rounded-md">
                      <p className="text-muted-foreground">Revenue chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-slate-100 rounded-md">
                      <p className="text-muted-foreground">Service popularity chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center bg-slate-100 rounded-md">
                      <p className="text-muted-foreground">User growth chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
