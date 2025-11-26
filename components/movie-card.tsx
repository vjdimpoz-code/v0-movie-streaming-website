"use client"

import Link from "next/link"
import { useState } from "react"
import { Play, Plus, Heart } from "lucide-react"

interface Movie {
  id: string
  title: string
  poster: string
  rating: number
  year: number
  genre: string[]
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[2/3] bg-card rounded-lg overflow-hidden">
          {/* Movie Poster */}
          <img
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-semibold text-foreground z-10">
            {movie.rating}/10
          </div>

          {/* Hover Actions */}
          {isHovered && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 transition-transform transform hover:scale-110">
                <Play className="w-6 h-6 fill-current" />
              </button>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setIsFavorited(!isFavorited)
                  }}
                  className="bg-black/70 hover:bg-black text-foreground rounded-full p-2 transition"
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isFavorited ? "currentColor" : "none"}
                    color={isFavorited ? "#ff1744" : "white"}
                  />
                </button>
                <button className="bg-black/70 hover:bg-black text-foreground rounded-full p-2 transition">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="mt-3 space-y-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition line-clamp-2 text-sm">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{movie.year}</span>
            <span>•</span>
            <span className="line-clamp-1">{movie.genre.join(", ")}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
