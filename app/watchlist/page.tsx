"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Trash2, ListX, Eye } from "lucide-react"

interface WatchlistItem {
  id: string
  title: string
  poster: string
  rating: number
  year: number
  genre: string[]
  progress: number // percentage watched
  addedDate: string
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      id: "1",
      title: "Cosmic Explorer",
      poster: "/placeholder.svg?key=cosmic",
      rating: 8.5,
      year: 2024,
      genre: ["Sci-Fi", "Adventure"],
      progress: 45,
      addedDate: "2024-11-20",
    },
    {
      id: "4",
      title: "Action Heroes",
      poster: "/placeholder.svg?key=action",
      rating: 8.1,
      year: 2024,
      genre: ["Action", "Adventure"],
      progress: 0,
      addedDate: "2024-11-15",
    },
    {
      id: "6",
      title: "Future World",
      poster: "/placeholder.svg?key=future",
      rating: 7.9,
      year: 2024,
      genre: ["Sci-Fi", "Thriller"],
      progress: 75,
      addedDate: "2024-11-10",
    },
  ])

  const [sortBy, setSortBy] = useState<"added" | "progress" | "rating">("added")
  const [filterType, setFilterType] = useState<"all" | "watching" | "completed" | "unwatched">("all")

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter((item) => item.id !== id))
  }

  const filteredWatchlist = watchlist.filter((item) => {
    if (filterType === "all") return true
    if (filterType === "watching") return item.progress > 0 && item.progress < 100
    if (filterType === "completed") return item.progress === 100
    if (filterType === "unwatched") return item.progress === 0
    return true
  })

  const sortedWatchlist = [...filteredWatchlist].sort((a, b) => {
    if (sortBy === "added") return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    if (sortBy === "progress") return b.progress - a.progress
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">My Watchlist</h1>
            <p className="text-muted-foreground text-lg">
              {watchlist.length} movie{watchlist.length !== 1 ? "s" : ""} saved
            </p>
          </div>

          {watchlist.length > 0 ? (
            <>
              {/* Controls */}
              <div className="mb-10 flex flex-col sm:flex-row gap-4">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All" },
                    { id: "watching", label: "Watching" },
                    { id: "completed", label: "Completed" },
                    { id: "unwatched", label: "Unwatched" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setFilterType(filter.id as any)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        filterType === filter.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground hover:bg-card/80 border border-border"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex gap-2 ml-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 bg-card border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="added">Recently Added</option>
                    <option value="progress">Progress</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {/* Watchlist Grid */}
              {sortedWatchlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedWatchlist.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition"
                    >
                      {/* Movie Poster */}
                      <Link href={`/movie/${item.id}`}>
                        <div className="relative aspect-[2/3] overflow-hidden bg-card">
                          <img
                            src={item.poster || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="p-4 space-y-3">
                        <div>
                          <Link href={`/movie/${item.id}`} className="hover:text-primary transition">
                            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary">
                              {item.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{item.year}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span className="text-accent">★</span>
                              {item.rating}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {item.progress > 0 && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-muted-foreground">Watch Progress</span>
                              <span className="text-xs font-semibold text-foreground">{item.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Link href={`/movie/${item.id}`} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Watch
                            </Button>
                          </Link>
                          <button
                            onClick={() => removeFromWatchlist(item.id)}
                            className="px-3 py-2 hover:bg-destructive/20 text-destructive rounded-lg transition"
                            title="Remove from watchlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ListX className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    No {filterType !== "all" ? filterType : ""} movies
                  </h2>
                  <p className="text-muted-foreground">Add movies to your watchlist to see them here</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <ListX className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-3xl font-bold text-foreground mb-3">Your watchlist is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start building your watchlist by adding movies you want to watch later
              </p>
              <Link href="/browse">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                  Browse Movies
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
