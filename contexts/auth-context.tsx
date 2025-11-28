"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

// Define user types (keeping the same interface for compatibility)
export type UserRole = "user" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  image?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  googleLogin: (token: string) => Promise<{ success: boolean; message: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
  refreshSession: () => void
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Admin user email (for role assignment)
const ADMIN_EMAIL = "shivamgupta77399@gmail.com"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Convert Supabase user to our User interface
  const convertSupabaseUser = useCallback((supabaseUser: SupabaseUser): User => {
    const isAdmin = supabaseUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()

    return {
      id: supabaseUser.id,
      name:
        supabaseUser.user_metadata?.full_name ||
        supabaseUser.user_metadata?.name ||
        supabaseUser.email?.split("@")[0] ||
        "User",
      email: supabaseUser.email || "",
      role: isAdmin ? "admin" : "user",
      image: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture || undefined,
    }
  }, [])

  // Initialize auth state
  useEffect(() => {
    let isMounted = true
    const supabase = createClient()

    const initializeAuth = async () => {
      try {
        // Get initial session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        console.log("Supabase session on init:", session) // <-- Add this line

        if (error) {
          console.error("Error getting session:", error)
        }

        if (isMounted) {
          if (session?.user) {
            setUser(convertSupabaseUser(session.user))
          } else {
            setUser(null)
          }
          setIsLoading(false)
          setMounted(true)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        if (isMounted) {
          setIsLoading(false)
          setMounted(true)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isMounted) {
        if (session?.user) {
          setUser(convertSupabaseUser(session.user))
        } else {
          setUser(null)
        }
        setIsLoading(false)
        setMounted(true) // <-- Add this line to ensure mounted is set after auth change
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [convertSupabaseUser])

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      const supabase = createClient()

      try {
        setIsLoading(true)

        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

        if (error) {
          setIsLoading(false)
          return { success: false, message: error.message }
        }

        if (data.user) {
          const convertedUser = convertSupabaseUser(data.user)
          setUser(convertedUser)
          console.log("User set after login:", convertedUser) // <-- Add this line
        }

        setIsLoading(false)
        return { success: true, message: "Login successful" }
      } catch (error: any) {
        setIsLoading(false)
        return { success: false, message: error.message || "An error occurred during login" }
      }
    },
    [convertSupabaseUser],
  )

  // Google login function
  const googleLogin = useCallback(async (token: string) => {
    const supabase = createClient()

    try {
      setIsLoading(true)

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setIsLoading(false)
        return { success: false, message: error.message }
      }

      // OAuth redirect will handle the rest
      return { success: true, message: "Redirecting to Google..." }
    } catch (error: any) {
      setIsLoading(false)
      return { success: false, message: error.message || "An error occurred during Google login" }
    }
  }, [])

  // Signup function
  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      const supabase = createClient()

      try {
        setIsLoading(true)

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
              name: name.trim(),
            },
          },
        })

        if (error) {
          setIsLoading(false)
          return { success: false, message: error.message }
        }

        if (data.user) {
          // Check if email confirmation is required
          if (data.user.email_confirmed_at) {
            setUser(convertSupabaseUser(data.user))
            setIsLoading(false)
            return { success: true, message: "Account created successfully!" }
          } else {
            setIsLoading(false)
            return {
              success: true,
              message: "Please check your email to confirm your account before logging in.",
            }
          }
        }

        setIsLoading(false)
        return { success: true, message: "Account created successfully!" }
      } catch (error: any) {
        setIsLoading(false)
        return { success: false, message: error.message || "An error occurred during signup" }
      }
    },
    [convertSupabaseUser],
  )

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Logout error:", error)
      } else {
        setUser(null)
        router.push("/") // Changed from "/login" to "/"
      }
    } catch (error) {
      console.error("Logout exception:", error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  // Refresh session function
  const refreshSession = useCallback(async () => {
    const supabase = createClient()

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(convertSupabaseUser(session.user))
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Refresh session error:", error)
    }
  }, [convertSupabaseUser])

  // Don't render during SSR or before mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        googleLogin,
        signup,
        logout,
        isLoading,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
