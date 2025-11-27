"use client"

import { useState } from "react"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isInWatchlist, addToWatchlist, removeFromWatchlist, getRating, setRating } from "@/lib/watchlist-storage"
import Link from "next/link"

interface MovieCardEnhancedProps {
  id: string
  title: string
  poster: string
  rating: number
  genre: string
}

export default function MovieCardEnhanced({ id, title, poster, rating, genre }: MovieCardEnhancedProps) {
  const [inWatchlist, setInWatchlist] = useState(() => isInWatchlist(id))
  const [userRating, setUserRating] = useState(() => getRating(id))
  const [hoverRating, setHoverRating] = useState(0)

  const toggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(id)
      setInWatchlist(false)
    } else {
      addToWatchlist(id)
      setInWatchlist(true)
    }
  }

  const handleRate = (rate: number) => {
    setRating(id, rate)
    setUserRating(rate)
  }

  return (
    <Link href={`/movie/${id}`}>
      <div className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition cursor-pointer">
        {/* Poster Image */}
        <div className="relative overflow-hidden aspect-[2/3]">
          <img
            src={poster || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>

        {/* Info Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
          <h3 className="font-bold text-foreground mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{genre}</p>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={(e) => {
                  e.preventDefault()
                  handleRate(star)
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`w-4 h-4 transition ${
                    star <= (hoverRating || userRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault()
                toggleWatchlist()
              }}
              className={`flex-1 ${inWatchlist ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-card/50"}`}
              size="sm"
            >
              <Heart className={`w-4 h-4 ${inWatchlist ? "fill-current" : ""}`} />
              {inWatchlist ? "Saved" : "Add"}
            </Button>
            <Link href={`/movie/${id}`} onClick={(e) => e.preventDefault()}>
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
                Watch
              </Button>
            </Link>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
          {rating.toFixed(1)}
        </div>
      </div>
    </Link>
  )
}
