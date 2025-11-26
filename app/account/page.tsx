"use client"

import Link from "next/link"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { LogOut, LogIn, UserPlus } from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {activeTab === "profile" && (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Centered Card */}
            <div className="bg-card border border-border rounded-lg p-8 text-center space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-3xl font-bold">D</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to DIMPOZ MOVIES</h1>
                <p className="text-muted-foreground">
                  Sign in to your account or create a new one to start watching amazing movies and shows.
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link href="/auth/login" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-6 text-lg font-semibold">
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-card/80 rounded-lg py-6 text-lg font-semibold bg-transparent"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </Button>
                </Link>
              </div>

              {/* Benefits */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Get access to:</p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Thousands of movies and TV shows
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Your personal watchlist
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Personalized recommendations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && !isEditing && (
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
                JD
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                <p className="text-foreground">{profile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                <p className="text-foreground">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Phone</label>
                <p className="text-foreground">{profile.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Country</label>
                <p className="text-foreground">{profile.country}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      )}

      {/* Edit Profile Tab */}
      {activeTab === "profile" && isEditing && (
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
                JD
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSaveProfile}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-border text-foreground hover:bg-card/80 rounded-lg"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          {/* Notifications */}
          <div className="pb-6 border-b border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Notifications</h3>
            <div className="space-y-3">
              {["Email notifications", "Marketing emails", "New releases alerts"].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked={true} className="w-4 h-4 accent-primary rounded" />
                  <span className="text-foreground">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="pb-6 border-b border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Privacy</h3>
            <div className="space-y-3">
              {["Make profile public", "Show watch history", "Allow recommendations"].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked={false} className="w-4 h-4 accent-primary rounded" />
                  <span className="text-foreground">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Danger Zone</h3>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10 rounded-lg bg-transparent"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
