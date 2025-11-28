"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface BookingData {
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceId: string
  providerId?: string
  bookingDate: string
  bookingTime: string
  totalPrice: number
  notes?: string
}

interface RazorpayPaymentProps {
  amount: number
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  bookingData?: BookingData
  onSuccess: (response: any) => void
  onError: (error: any) => void
  onClose: () => void
  accessToken?: string
  userId?: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RazorpayPayment({
  amount,
  customerInfo,
  bookingData,
  onSuccess,
  onError,
  onClose,
  accessToken,
  userId,
}: RazorpayPaymentProps) {
  const [loading, setLoading] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          setScriptLoaded(true)
          resolve(true)
          return
        }

        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.onload = () => {
          setScriptLoaded(true)
          resolve(true)
        }
        script.onerror = () => {
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }

    loadRazorpayScript()
  }, [])

  const createOrder = async () => {
    try {
      console.log("[v0] Creating order with amount:", amount)
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `order_${Date.now()}`,
        }),
      })

      console.log("[v0] Create order response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[v0] Create order error response:", errorData)
        throw new Error(errorData.error || "Failed to create order")
      }

      const data = await response.json()
      console.log("[v0] Order created successfully:", data)
      return data
    } catch (error) {
      console.error("[v0] Error creating order:", error)
      throw error
    }
  }

  const verifyPayment = async (paymentData: any) => {
    try {
      console.log("[v0] Verifying payment with booking data:", bookingData)

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`
      }

      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...paymentData,
          bookingData: {
            ...bookingData,
            userId, // Include userId in booking data
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[v0] Verify payment error response:", errorData)
        throw new Error(errorData.error || "Payment verification failed")
      }

      const data = await response.json()
      console.log("[v0] Payment verified successfully:", data)
      return data
    } catch (error) {
      console.error("[v0] Error verifying payment:", error)
      throw error
    }
  }

  const handlePayment = async () => {
    if (!scriptLoaded) {
      onError({ message: "Payment system not loaded. Please try again." })
      return
    }

    setLoading(true)

    try {
      const orderData = await createOrder()

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "UtilityHub",
        description: "Service Booking Payment",
        order_id: orderData.orderId,
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        theme: {
          color: "#2563eb",
        },
        handler: async (response: any) => {
          try {
            await verifyPayment(response)
            onSuccess(response)
          } catch (error) {
            onError(error)
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
            onClose()
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on("payment.failed", (response: any) => {
        setLoading(false)
        onError(response.error)
      })

      razorpay.open()
    } catch (error) {
      setLoading(false)
      onError(error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Complete Payment</h3>
        <p className="text-gray-600 mb-4">Amount to pay: ₹{amount}</p>
      </div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handlePayment} disabled={loading || !scriptLoaded}>
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </div>

      {!scriptLoaded && <div className="text-center text-sm text-gray-500">Loading payment system...</div>}
    </div>
  )
}
