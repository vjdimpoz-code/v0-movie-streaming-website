"use client"

import { AdminGuard } from "@/components/admin-guard"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

interface UserRecord {
  uid: string
  email: string
  isAdmin: boolean
  createdAt: string
}

export default function UsersManagementPage() {
  const { user } = useAuth()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState<UserRecord[]>([
    {
      uid: "1",
      email: "vjdimpoz@gmail.com",
      isAdmin: true,
      createdAt: "2024-01-01",
    },
    {
      uid: "2",
      email: "user@example.com",
      isAdmin: false,
      createdAt: "2024-01-15",
    },
  ])

  const handleSetAdmin = async () => {
    if (!email) {
      setMessage("Please enter an email address")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      const response = await fetch(`${baseUrl}/api/admin/set-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ADMIN_SECRET}`,
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Success: ${email} is now an admin`)
        setEmail("")
        // Update local user list
        setUsers(users.map((u) => (u.email === email ? { ...u, isAdmin: true } : u)))
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Failed to set admin"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveAdmin = async (userEmail: string) => {
    setLoading(true)
    setMessage("")

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      const response = await fetch(`${baseUrl}/api/admin/remove-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ADMIN_SECRET}`,
        },
        body: JSON.stringify({ email: userEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Success: ${userEmail} is no longer an admin`)
        setUsers(users.map((u) => (u.email === userEmail ? { ...u, isAdmin: false } : u)))
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Failed to remove admin"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Users Management</h1>

          {/* Set Admin Section */}
          <div className="bg-slate-900 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Make User Admin</h2>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSetAdmin}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium disabled:opacity-50"
              >
                {loading ? "Processing..." : "Make Admin"}
              </button>
            </div>
            {message && (
              <p className={`mt-4 ${message.includes("Success") ? "text-green-400" : "text-red-400"}`}>{message}</p>
            )}
          </div>

          {/* Users List */}
          <div className="bg-slate-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">All Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Created</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.uid} className="border-b border-slate-800 hover:bg-slate-800">
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            user.isAdmin ? "bg-blue-900 text-blue-200" : "bg-gray-900 text-gray-300"
                          }`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{user.createdAt}</td>
                      <td className="py-3 px-4">
                        {user.email !== user.email && (
                          <button
                            onClick={() => handleRemoveAdmin(user.email)}
                            disabled={loading}
                            className="text-red-400 hover:text-red-300 disabled:opacity-50"
                          >
                            Remove Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
