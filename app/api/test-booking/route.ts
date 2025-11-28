import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Test booking endpoint called")

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[v0] Supabase environment variables not configured")
      return NextResponse.json({ error: "Database service not configured" }, { status: 500 })
    }

    // Test booking data
    const testBooking = {
      customer_name: "Test Customer",
      customer_email: "test@example.com",
      customer_phone: "+1234567890",
      service_id: "26",
      booking_date: "2025-11-15",
      booking_time: "14:30",
      total_price: 299,
      status: "confirmed",
      notes: "This is a test booking",
      provider_id: null,
    }

    console.log("[v0] Inserting test booking:", testBooking)

    // Use Supabase REST API directly to avoid auth module issues
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      body: JSON.stringify(testBooking),
    })

    console.log("[v0] Supabase API response status:", response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] Supabase API error:", errorData)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to insert booking",
          details: errorData,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("[v0] Booking inserted successfully:", data)

    return NextResponse.json(
      {
        success: true,
        message: "Test booking created successfully",
        booking: data,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Unexpected error in test booking:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
