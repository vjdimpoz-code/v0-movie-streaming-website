"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import MovieCard from "@/components/movie-card"
import Link from "next/link"
import { TrendingUp, Clock, Heart, Star } from "lucide-react"

interface DashboardStats {
  totalWatched: number
  totalHours: number
  favorited: number
  watchlistItems: number
}

interface ContinueWatchingItem {
  id: string
  title: string
  poster: string
  progress: number
}

export default function DashboardPage() {
  const stats: DashboardStats = {
    totalWatched: 24,
    totalHours: 96,
    favorited: 8,
    watchlistItems: 15,
  }

  const continueWatching: ContinueWatchingItem[] = [
    {
      id: "1",
      title: "Cosmic Explorer",
      poster: "/placeholder.svg?key=cosmic",
      progress: 45,
    },
    {
      id: "6",
      title: "Future World",
      poster: "/placeholder.svg?key=future",
      progress: 75,
    },
    {
      id: "2",
      title: "Dark Mysteries",
      poster: "/placeholder.svg?key=dark",
      progress: 30,
    },
    {
      id: "5",
      title: "The Last Stand",
      poster: "/placeholder.svg?key=stand",
      progress: 60,
    },
  ]

  const recommendations = [
    {
      id: "9",
      title: "Star Journey",
      poster: "/placeholder.svg?key=journey",
      rating: 8.3,
      year: 2024,
      genre: ["Sci-Fi", "Adventure"],
    },
    {
      id: "10",
      title: "Beyond Horizon",
      poster: "/placeholder.svg?key=horizon",
      rating: 8.0,
      year: 2023,
      genre: ["Adventure", "Drama"],
    },
    {
      id: "11",
      title: "Digital Dreams",
      poster: "/placeholder.svg?key=dreams",
      rating: 7.9,
      year: 2024,
      genre: ["Sci-Fi", "Thriller"],
    },
    {
      id: "12",
      title: "Time Fracture",
      poster: "/placeholder.svg?key=fracture",
      rating: 8.4,
      year: 2023,
      genre: ["Sci-Fi", "Mystery"],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Welcome back, John!</h1>
            <p className="text-muted-foreground text-lg">Pick up where you left off or explore something new</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              {
                icon: TrendingUp,
                label: "Movies Watched",
                value: stats.totalWatched,
              },
              {
                icon: Clock,
                label: "Hours Watched",
                value: stats.totalHours,
              },
              {
                icon: Heart,
                label: "Favorited",
                value: stats.favorited,
              },
              {
                icon: Star,
                label: "Watchlist",
                value: stats.watchlistItems,
              },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Continue Watching */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Continue Watching</h2>
              <Link href="/watchlist" className="text-primary hover:text-primary/90 transition">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {continueWatching.map((item) => (
                <Link key={item.id} href={`/movie/${item.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[2/3] bg-card rounded-lg overflow-hidden mb-3">
                      <img
                        src={item.poster || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {/* Progress Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                        <div className="h-full bg-primary transition-all" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.progress}% watched</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recommended For You */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Recommended For You</h2>
              <Link href="/browse" className="text-primary hover:text-primary/90 transition">
                Explore all
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {recommendations.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
