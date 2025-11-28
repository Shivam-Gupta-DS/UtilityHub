import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = await request.json()

    console.log("[v0] Payment verification started")
    console.log("[v0] Booking data received:", bookingData)

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.log("[v0] Missing required payment parameters")
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Create signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    // Verify signature
    const isAuthentic = expectedSignature === razorpay_signature

    console.log("[v0] Payment signature verified:", isAuthentic)

    if (isAuthentic) {
      if (bookingData) {
        try {
          console.log("[v0] Preparing booking data for database insertion")

          // Prepare booking object with all required fields
          const bookingRecord = {
            customer_name: bookingData.customerName || "",
            customer_email: bookingData.customerEmail || "",
            customer_phone: bookingData.customerPhone || null,
            service_id: bookingData.serviceId,
            provider_id: bookingData.providerId || null,
            booking_date: bookingData.bookingDate, // Format: YYYY-MM-DD
            booking_time: bookingData.bookingTime, // Format: HH:MM
            total_price: Number.parseInt(bookingData.totalPrice) || 0,
            notes: bookingData.notes || null,
            status: "confirmed", // Set to confirmed since payment is successful
            user_id: bookingData.userId || null, // Include user_id
          }

          console.log("[v0] Booking record to insert:", bookingRecord)

          // Get authorization header from request
          const authHeader = request.headers.get("Authorization")

          // Create Supabase client with user's auth token if available
          // This allows RLS policies to work correctly based on the user's identity
          const { createClient } = await import("@supabase/supabase-js")
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
          const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

          const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: {
              headers: authHeader ? { Authorization: authHeader } : undefined,
            },
          })

          const { data: insertResult, error: insertError } = await supabase
            .from("bookings")
            .insert([bookingRecord])
            .select()
            .single()

          if (insertError) {
            console.error("[v0] Database error saving booking:", insertError)
            // We don't fail the request here because payment was successful
            // In a real app, we might want to queue this or alert an admin
          } else {
            console.log("[v0] Booking saved successfully:", insertResult)
          }
        } catch (error) {
          console.error("[v0] Exception in booking creation:", error)
          // Continue with payment success even if booking creation fails
        }
      } else {
        console.log("[v0] No booking data provided")
      }

      // Payment is verified
      console.log("[v0] Payment verification successful")
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      })
    } else {
      console.log("[v0] Payment signature verification failed")
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Error verifying payment:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
