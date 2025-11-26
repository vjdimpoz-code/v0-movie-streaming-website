"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MovieCard from "@/components/movie-card"
import { SearchIcon } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  poster: string
  rating: number
  year: number
  genre: string[]
  type: "movie" | "show"
}

const allMovies: SearchResult[] = [
  {
    id: "1",
    title: "Cosmic Explorer",
    poster: "/placeholder.svg?key=cosmic1",
    rating: 8.5,
    year: 2024,
    genre: ["Sci-Fi", "Adventure"],
    type: "movie",
  },
  {
    id: "2",
    title: "Dark Mysteries",
    poster: "/placeholder.svg?key=dark1",
    rating: 8.2,
    year: 2024,
    genre: ["Thriller", "Mystery"],
    type: "movie",
  },
  {
    id: "3",
    title: "Love & Dreams",
    poster: "/placeholder.svg?key=love1",
    rating: 7.8,
    year: 2023,
    genre: ["Drama", "Romance"],
    type: "movie",
  },
  {
    id: "4",
    title: "Action Heroes",
    poster: "/placeholder.svg?key=action1",
    rating: 8.1,
    year: 2024,
    genre: ["Action", "Adventure"],
    type: "movie",
  },
  {
    id: "5",
    title: "The Last Stand",
    poster: "/placeholder.svg?key=stand1",
    rating: 8.4,
    year: 2023,
    genre: ["War", "Drama"],
    type: "movie",
  },
  {
    id: "6",
    title: "Future World",
    poster: "/placeholder.svg?key=future1",
    rating: 7.9,
    year: 2024,
    genre: ["Sci-Fi", "Thriller"],
    type: "movie",
  },
  {
    id: "7",
    title: "Ocean Deep",
    poster: "/placeholder.svg?key=ocean1",
    rating: 8.0,
    year: 2024,
    genre: ["Adventure", "Fantasy"],
    type: "movie",
  },
  {
    id: "8",
    title: "Silent Echo",
    poster: "/placeholder.svg?key=silent1",
    rating: 7.7,
    year: 2023,
    genre: ["Thriller", "Mystery"],
    type: "movie",
  },
  {
    id: "13",
    title: "Cosmic Series",
    poster: "/placeholder.svg?key=series1",
    rating: 8.3,
    year: 2024,
    genre: ["Sci-Fi", "Drama"],
    type: "show",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedType, setSelectedType] = useState<"all" | "movie" | "show">("all")

  // Simulate search functionality
  useEffect(() => {
    if (query.trim()) {
      const filtered = allMovies.filter((item) => {
        const matchesQuery =
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.genre.some((g) => g.toLowerCase().includes(query.toLowerCase()))
        const matchesType = selectedType === "all" || item.type === selectedType
        return matchesQuery && matchesType
      })
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query, selectedType])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Search StreamFlix</h1>

            {/* Search Input */}
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies, shows, actors, genres..."
                className="w-full pl-12 pr-4 py-4 bg-card border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                autoFocus
              />
            </div>
          </div>

          {/* Type Filter */}
          {query && (
            <div className="mb-8 flex gap-3">
              {[
                { value: "all", label: "All Results" },
                { value: "movie", label: "Movies" },
                { value: "show", label: "TV Shows" },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value as "all" | "movie" | "show")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedType === type.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-card/80 border border-border"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          {query ? (
            <div>
              {results.length > 0 ? (
                <>
                  <p className="text-muted-foreground mb-6">
                    Found <span className="font-semibold text-foreground">{results.length}</span> result
                    {results.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {results.map((item) => (
                      <MovieCard key={item.id} movie={item} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">No results found</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find anything matching "{query}". Try searching for a different movie, show, or genre.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Start searching</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Search for your favorite movies, shows, actors, or genres to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
