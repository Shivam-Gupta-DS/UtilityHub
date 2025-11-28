import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("[v0] Razorpay environment variables not configured")
      return NextResponse.json({ error: "Payment service not configured" }, { status: 500 })
    }

    const { amount, currency = "INR", receipt } = await request.json()

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    console.log("[v0] Creating Razorpay order with amount:", amount)

    const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64")

    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt: receipt || `order_${Date.now()}`,
      }),
    })

    if (!orderResponse.ok) {
      const errorData = await orderResponse.text()
      console.error("[v0] Razorpay API error:", errorData)
      return NextResponse.json({ error: "Failed to create order", details: errorData }, { status: 500 })
    }

    const order = await orderResponse.json()
    console.log("[v0] Order created successfully:", order.id)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("[v0] Error creating Razorpay order:", error)
    return NextResponse.json(
      { error: "Failed to create order", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
