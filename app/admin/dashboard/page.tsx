"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Users, Film, TrendingUp, LogOut, Eye, Edit2, Trash2 } from "lucide-react"
import { getAdminToken, clearAdminToken } from "@/lib/admin-auth"

interface AdminStats {
  totalUsers: number
  totalMovies: number
  totalViews: number
  totalRevenue: number
}

interface RecentMovie {
  id: string
  title: string
  genre: string
  uploadedDate: string
  views: number
}

interface RecentUser {
  id: string
  email: string
  joinedDate: string
  subscription: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Check admin authentication
    const token = getAdminToken()
    if (!token) {
      router.push("/admin/login")
      return
    }
    setAdminEmail(token)
    setIsAuthenticated(true)
  }, [router])

  const handleLogout = () => {
    clearAdminToken()
    router.push("/admin/login")
  }

  const stats: AdminStats = {
    totalUsers: 1247,
    totalMovies: 342,
    totalViews: 45230,
    totalRevenue: 125400,
  }

  const recentMovies: RecentMovie[] = [
    {
      id: "1",
      title: "Cosmic Explorer",
      genre: "Sci-Fi",
      uploadedDate: "2024-12-15",
      views: 1234,
    },
    {
      id: "2",
      title: "Dark Mysteries",
      genre: "Thriller",
      uploadedDate: "2024-12-14",
      views: 856,
    },
    {
      id: "3",
      title: "Action Heroes",
      genre: "Action",
      uploadedDate: "2024-12-13",
      views: 2341,
    },
    {
      id: "4",
      title: "Family Fun",
      genre: "Family",
      uploadedDate: "2024-12-12",
      views: 567,
    },
  ]

  const recentUsers: RecentUser[] = [
    {
      id: "1",
      email: "user1@example.com",
      joinedDate: "2024-12-15",
      subscription: "1 Month",
    },
    {
      id: "2",
      email: "user2@example.com",
      joinedDate: "2024-12-14",
      subscription: "1 Week",
    },
    {
      id: "3",
      email: "user3@example.com",
      joinedDate: "2024-12-13",
      subscription: "4 Days",
    },
    {
      id: "4",
      email: "user4@example.com",
      joinedDate: "2024-12-12",
      subscription: "1 Month",
    },
  ]

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="px-4 md:px-8 lg:px-12 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">D</span>
              </div>
              <span className="text-lg font-bold text-foreground">ADMIN PANEL</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">{adminEmail}</div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "overview"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("movies")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "movies"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "users"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "settings"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Settings
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    icon: Users,
                    label: "Total Users",
                    value: stats.totalUsers,
                    color: "bg-blue-500/20",
                  },
                  {
                    icon: Film,
                    label: "Total Movies",
                    value: stats.totalMovies,
                    color: "bg-purple-500/20",
                  },
                  {
                    icon: Eye,
                    label: "Total Views",
                    value: stats.totalViews,
                    color: "bg-green-500/20",
                  },
                  {
                    icon: TrendingUp,
                    label: "Revenue (UGX)",
                    value: `${(stats.totalRevenue / 1000).toFixed(0)}K`,
                    color: "bg-orange-500/20",
                  },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 ${stat.color} rounded-lg`}>
                          <Icon className="w-5 h-5 text-foreground" />
                        </div>
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                      </div>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  )
                })}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Movies */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">Recent Movies</h2>
                  <div className="space-y-4">
                    {recentMovies.map((movie) => (
                      <div
                        key={movie.id}
                        className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{movie.title}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{movie.genre}</span>
                            <span className="text-xs text-muted-foreground">{movie.uploadedDate}</span>
                            <span className="text-xs text-muted-foreground">{movie.views} views</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-primary/20 rounded-lg transition">
                            <Edit2 className="w-4 h-4 text-primary" />
                          </button>
                          <button className="p-2 hover:bg-destructive/20 rounded-lg transition">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Users */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">Recent Users</h2>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{user.email}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                              {user.subscription}
                            </span>
                            <span className="text-xs text-muted-foreground">Joined {user.joinedDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Movies Tab */}
          {activeTab === "movies" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Movie Management</h2>
                <Button className="bg-primary hover:bg-primary/90">Add New Movie</Button>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="space-y-4">
                  {recentMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{movie.title}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{movie.genre}</span>
                          <span className="text-xs text-muted-foreground">{movie.views} views</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">User Management</h2>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{user.email}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            {user.subscription}
                          </span>
                          <span className="text-xs text-muted-foreground">{user.joinedDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                          Deactivate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Admin Settings</h2>
              <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Platform Configuration</h3>
                  <p className="text-muted-foreground mb-4">Manage general platform settings and configurations</p>
                  <Button variant="outline">Configure Settings</Button>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Security</h3>
                  <p className="text-muted-foreground mb-4">Manage admin access and security settings</p>
                  <Button variant="outline">Manage Access</Button>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">System Maintenance</h3>
                  <p className="text-muted-foreground mb-4">Perform system backups and maintenance tasks</p>
                  <Button variant="outline">Maintenance Tools</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
