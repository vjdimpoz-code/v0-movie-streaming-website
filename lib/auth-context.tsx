"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  email: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string) => Promise<void>
  signUp: (email: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      const email = "user@gmail.com"
      const userData: User = {
        email,
        isAdmin: email.toLowerCase() === "vjdimpoz@gmail.com",
      }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      console.error("Google sign-in failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string) => {
    setIsLoading(true)
    try {
      const userData: User = {
        email,
        isAdmin: email.toLowerCase() === "vjdimpoz@gmail.com",
      }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      console.error("Sign-in failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string) => {
    setIsLoading(true)
    try {
      const userData: User = {
        email,
        isAdmin: email.toLowerCase() === "vjdimpoz@gmail.com",
      }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      console.error("Sign-up failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("adminToken")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
