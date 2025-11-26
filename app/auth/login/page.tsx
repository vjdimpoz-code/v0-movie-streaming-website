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
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-foreground">StreamFlix</span>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8">Sign in to your account to continue streaming</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition mt-6"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue as guest</span>
            </div>
          </div>

          {/* Guest Button */}
          <Button
            variant="outline"
            className="w-full border-border text-foreground hover:bg-card py-3 rounded-lg transition bg-transparent"
          >
            Browse as Guest
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:text-primary/90 font-semibold transition">
              Sign up
            </Link>
          </p>

          {/* Forgot Password Link */}
          <p className="text-center mt-4">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Forgot your password?
            </Link>
          </p>
        </div>

        {/* Footer Info */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="hover:text-foreground transition">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-foreground transition">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  )
}
