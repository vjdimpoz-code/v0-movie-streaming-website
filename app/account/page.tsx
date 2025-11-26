"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { LogOut, Settings, User } from "lucide-react"

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
    <main className="min-h-screen bg-background">
      <Header />

      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-2">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-border mb-8">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "settings", label: "Settings", icon: Settings },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition border-b-2 ${
                  activeTab === id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
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
                <div className="space-y-4">
                  {!isEditing ? (
                    <>
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
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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
        </div>
      </div>

      <Footer />
    </main>
  )
}
