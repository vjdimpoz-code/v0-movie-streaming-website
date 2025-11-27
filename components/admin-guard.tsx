"use client"

import { useAuth } from "@/lib/auth-context"
import type { ReactNode } from "react"
import Link from "next/link"

interface AdminGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user?.isAdmin) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-gray-400">You need admin privileges to access this page</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      )
    )
  }

  return <>{children}</>
}
