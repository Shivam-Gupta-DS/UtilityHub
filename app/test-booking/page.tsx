"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestBookingPage() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFire = async () => {
        setLoading(true)
        setResult(null)
        setError(null)

        try {
            const supabase = createClient()

            // Hardcoded valid data
            const bookingData = {
                customer_name: "Test User",
                customer_email: "test@example.com",
                customer_phone: "1234567890",
                service_id: "24", // Valid UUID for 'Drain Cleaning' (updated) or 'Women's Hair Styling'
                provider_id: null,
                booking_date: "2025-11-29",
                booking_time: "10:00",
                total_price: 100,
                notes: "Test booking via fire button",
                status: "confirmed",
                user_id: "6503af8b-1ce5-4526-915b-1afa621400c7" // User's ID from logs
            }

            console.log("Attempting to insert booking:", bookingData)

            const { data, error } = await supabase
                .from("bookings")
                .insert([bookingData])
                .select()
                .single()

            if (error) {
                console.error("Error inserting booking:", error)
                setError(JSON.stringify(error, null, 2))
            } else {
                console.log("Booking inserted successfully:", data)
                setResult(data)
            }
        } catch (err: any) {
            console.error("Exception:", err)
            setError(err.message || "An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Test Booking Insertion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-auto max-h-48">
                        <p className="font-bold mb-2">Data to Insert:</p>
                        <pre>
                            {JSON.stringify({
                                customer_name: "Test User",
                                customer_email: "test@example.com",
                                service_id: "550e8400-e29b-41d4-a716-446655440101",
                                user_id: "6503af8b-1ce5-4526-915b-1afa621400c7",
                                status: "confirmed"
                            }, null, 2)}
                        </pre>
                    </div>

                    <Button
                        onClick={handleFire}
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {loading ? "Firing..." : "FIRE (Insert Booking)"}
                    </Button>

                    {result && (
                        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
                            <h3 className="font-bold mb-2">Success!</h3>
                            <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
                            <h3 className="font-bold mb-2">Error</h3>
                            <pre className="text-xs overflow-auto">{error}</pre>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
