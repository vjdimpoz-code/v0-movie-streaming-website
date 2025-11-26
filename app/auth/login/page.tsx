"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        console.log("Logging in:", { email, password })
        // In real app, redirect to dashboard
        setIsLoading(false)
      } else {
        setError("Please enter both email and password")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">D</span>
          </div>
          <span className="text-2xl font-bold text-foreground">DIMPOZ MOVIES</span>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Sign In</h1>
          <p className="text-muted-foreground text-center mb-8">Welcome back to your movies</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/20 border border-destructive text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition mt-8"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground text-sm mb-4">Don't have an account?</p>
            <Link href="/auth/signup">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 py-2 rounded-lg transition bg-transparent"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
