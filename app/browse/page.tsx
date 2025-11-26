"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MovieGrid from "@/components/movie-grid"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function BrowsePage() {
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [sortBy, setSortBy] = useState("trending")
  const [showGenreDropdown, setShowGenreDropdown] = useState(false)
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const genres = [
    { id: "all", label: "All Genres" },
    { id: "action", label: "Action" },
    { id: "comedy", label: "Comedy" },
    { id: "drama", label: "Drama" },
    { id: "horror", label: "Horror" },
    { id: "sci-fi", label: "Sci-Fi" },
    { id: "thriller", label: "Thriller" },
    { id: "romance", label: "Romance" },
    { id: "adventure", label: "Adventure" },
    { id: "fantasy", label: "Fantasy" },
  ]

  const years = [
    { id: "all", label: "All Years" },
    { id: "2024", label: "2024" },
    { id: "2023", label: "2023" },
    { id: "2022", label: "2022" },
    { id: "2021", label: "2021" },
    { id: "2020", label: "2020" },
  ]

  const sortOptions = [
    { id: "trending", label: "Trending" },
    { id: "newest", label: "Newest" },
    { id: "rating", label: "Highest Rated" },
    { id: "alphabetical", label: "A - Z" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">Browse All Movies</h1>
            <p className="text-muted-foreground text-lg">Discover thousands of movies across all genres</p>
          </div>

          {/* Filter and Sort Section */}
          <div className="mb-10 flex flex-wrap gap-3">
            {/* Genre Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowGenreDropdown(!showGenreDropdown)
                  setShowYearDropdown(false)
                  setShowSortDropdown(false)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-card/80 text-foreground rounded-lg border border-border transition"
              >
                <span className="text-sm font-medium">{genres.find((g) => g.id === selectedGenre)?.label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showGenreDropdown && (
                <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg z-20 min-w-48">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => {
                        setSelectedGenre(genre.id)
                        setShowGenreDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/20 transition ${
                        selectedGenre === genre.id ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      {genre.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Year Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowYearDropdown(!showYearDropdown)
                  setShowGenreDropdown(false)
                  setShowSortDropdown(false)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-card/80 text-foreground rounded-lg border border-border transition"
              >
                <span className="text-sm font-medium">{years.find((y) => y.id === selectedYear)?.label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showYearDropdown && (
                <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg z-20 min-w-40">
                  {years.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => {
                        setSelectedYear(year.id)
                        setShowYearDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/20 transition ${
                        selectedYear === year.id ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      {year.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort By */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSortDropdown(!showSortDropdown)
                  setShowGenreDropdown(false)
                  setShowYearDropdown(false)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-card/80 text-foreground rounded-lg border border-border transition"
              >
                <span className="text-sm font-medium">Sort: {sortOptions.find((s) => s.id === sortBy)?.label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showSortDropdown && (
                <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg z-20 min-w-48">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id)
                        setShowSortDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/20 transition ${
                        sortBy === option.id ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters Button */}
            {(selectedGenre !== "all" || selectedYear !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedGenre("all")
                  setSelectedYear("all")
                }}
                className="text-sm"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {(selectedGenre !== "all" || selectedYear !== "all") && (
            <div className="mb-8 p-4 bg-card/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                Showing movies
                {selectedGenre !== "all" && ` in ${genres.find((g) => g.id === selectedGenre)?.label}`}
                {selectedYear !== "all" && ` from ${selectedYear}`}
              </p>
            </div>
          )}

          {/* Movie Grid */}
          <MovieGrid category={`${selectedGenre}-${selectedYear}-${sortBy}`} />
        </div>
      </div>

      <Footer />
    </main>
  )
}
