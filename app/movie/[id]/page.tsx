"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import VideoPlayer from "@/components/video-player"
import MovieRecommendations from "@/components/movie-recommendations"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Download } from "lucide-react"

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  // Mock movie data - in real app, fetch from database
  const movie = {
    id: params.id,
    title: "Cosmic Explorer",
    year: 2024,
    rating: 8.5,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    duration: "2h 45m",
    director: "Christopher Nolan",
    cast: ["Tom Cruise", "Anne Hathaway", "Ryan Gosling", "Margot Robbie"],
    synopsis:
      "A groundbreaking journey through space and time as humanity explores the furthest reaches of the cosmos. Epic cinematography combined with mind-bending storytelling creates an unforgettable adventure.",
    longDescription:
      "Embark on an extraordinary cinematic journey that redefines what's possible in science fiction filmmaking. When a mysterious signal is detected from beyond our solar system, a diverse team of astronauts and scientists must embark on a mission that will test the limits of human endurance and courage. As they venture deeper into the unknown, they discover secrets that will change their understanding of reality itself.\n\nWith stunning practical effects, breathtaking space sequences, and an emotionally gripping narrative, Cosmic Explorer stands as a masterpiece of modern cinema. Director Christopher Nolan brings his signature style to create a film that is both intellectually stimulating and emotionally resonant.",
    maturityRating: "PG-13",
    releaseDate: "November 2024",
    poster: "/placeholder.svg?key=cosmic",
    backdrop: "/epic-space-scene-cosmic-cinematic.jpg",
    videoUrl: "https://sample-videos.com/sample.mp4",
    imdbUrl: "https://imdb.com",
    rottenTomatoesScore: 92,
    userScore: 85,
    seasons: 1,
    episodes: 8,
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Video Player */}
      <VideoPlayer movieTitle={movie.title} videoUrl={movie.videoUrl} />

      <div className="px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Movie Title and Rating */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded font-semibold">
                    {movie.maturityRating}
                  </span>
                  <span className="text-muted-foreground">{movie.year}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{movie.duration}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{movie.genre.join(", ")}</span>
                </div>
              </div>

              {/* Rating Badges */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{movie.rating}</div>
                  <p className="text-xs text-muted-foreground">IMDb</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{movie.rottenTomatoesScore}%</div>
                  <p className="text-xs text-muted-foreground">Rotten Tomatoes</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                Add to Watchlist
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsFavorited(!isFavorited)}
                className="border-foreground/20 text-foreground hover:bg-foreground/10 rounded-lg gap-2"
              >
                <Heart className="w-5 h-5" fill={isFavorited ? "currentColor" : "none"} />
                {isFavorited ? "Favorited" : "Favorite"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/20 text-foreground hover:bg-foreground/10 rounded-lg gap-2 bg-transparent"
              >
                <Share2 className="w-5 h-5" />
                Share
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/20 text-foreground hover:bg-foreground/10 rounded-lg gap-2 bg-transparent"
              >
                <Download className="w-5 h-5" />
                Download
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Synopsis and Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Synopsis */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Synopsis</h2>
                <p className="text-muted-foreground leading-relaxed text-pretty">{movie.longDescription}</p>
              </div>

              {/* Cast and Crew */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Cast & Crew</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Director</h3>
                    <p className="text-foreground">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Cast</h3>
                    <p className="text-foreground">{movie.cast.join(", ")}</p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="p-4 bg-card/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Available:</span> On StreamFlix • May 15, 2024
                </p>
              </div>
            </div>

            {/* Right Column - Movie Poster */}
            <div>
              <div className="sticky top-24">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded-lg shadow-2xl"
                />
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold">Released:</span> {movie.releaseDate}
                  </p>
                  <p>
                    <span className="font-semibold">Genre:</span> {movie.genre.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold">Rating:</span> {movie.maturityRating}
                  </p>
                  <p>
                    <span className="font-semibold">User Rating:</span> {movie.userScore}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-border mb-12"></div>

          {/* Related Movies */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">You Might Also Like</h2>
            <MovieRecommendations />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
