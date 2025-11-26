"use client"

import { useState, useEffect } from "react"
import MovieCard from "./movie-card"

interface Movie {
  id: string
  title: string
  poster: string
  rating: number
  year: number
  genre: string[]
  category: string
  dateAdded: number // added timestamp for sorting by recent
}

const mockMovies: Movie[] = [
  // ACTION
  {
    id: "1",
    title: "Cosmic Explorer",
    poster: "/sci-fi-movie-poster-cosmic-space.jpg",
    rating: 8.5,
    year: 2024,
    genre: ["Action", "Adventure"],
    category: "ACTION",
    dateAdded: Date.now(),
  },
  {
    id: "2",
    title: "Action Heroes",
    poster: "/action-adventure-movie-poster.jpg",
    rating: 8.1,
    year: 2024,
    genre: ["Action", "Adventure"],
    category: "ACTION",
    dateAdded: Date.now() - 86400000,
  },
  {
    id: "3",
    title: "The Last Stand",
    poster: "/war-drama-movie-poster.jpg",
    rating: 8.4,
    year: 2023,
    genre: ["Action", "War"],
    category: "ACTION",
    dateAdded: Date.now() - 172800000,
  },
  {
    id: "4",
    title: "Combat Zone",
    poster: "/action-adventure-movie-poster.jpg",
    rating: 8.0,
    year: 2024,
    genre: ["Action", "Thriller"],
    category: "ACTION",
    dateAdded: Date.now() - 259200000,
  },
  // SCI-FI
  {
    id: "5",
    title: "Future World",
    poster: "/dystopian-sci-fi-movie-poster.jpg",
    rating: 7.9,
    year: 2024,
    genre: ["Sci-Fi", "Thriller"],
    category: "SCI-FI",
    dateAdded: Date.now() - 345600000,
  },
  {
    id: "6",
    title: "Space Odyssey",
    poster: "/sci-fi-movie-poster-cosmic-space.jpg",
    rating: 8.3,
    year: 2024,
    genre: ["Sci-Fi", "Adventure"],
    category: "SCI-FI",
    dateAdded: Date.now() - 432000000,
  },
  {
    id: "7",
    title: "Quantum Realm",
    poster: "/dystopian-sci-fi-movie-poster.jpg",
    rating: 7.8,
    year: 2023,
    genre: ["Sci-Fi", "Mystery"],
    category: "SCI-FI",
    dateAdded: Date.now() - 518400000,
  },
  {
    id: "8",
    title: "Neural Network",
    poster: "/sci-fi-movie-poster-cosmic-space.jpg",
    rating: 8.2,
    year: 2024,
    genre: ["Sci-Fi", "Drama"],
    category: "SCI-FI",
    dateAdded: Date.now() - 604800000,
  },
  // ANIMATION
  {
    id: "9",
    title: "Animated Dreams",
    poster: "/adventure-fantasy-ocean-movie.jpg",
    rating: 8.0,
    year: 2024,
    genre: ["Animation", "Fantasy"],
    category: "ANIMATION",
    dateAdded: Date.now(),
  },
  {
    id: "10",
    title: "Pixel Universe",
    poster: "/adventure-fantasy-ocean-movie.jpg",
    rating: 7.9,
    year: 2024,
    genre: ["Animation", "Adventure"],
    category: "ANIMATION",
    dateAdded: Date.now() - 86400000,
  },
  {
    id: "11",
    title: "Enchanted Isle",
    poster: "/adventure-fantasy-ocean-movie.jpg",
    rating: 8.1,
    year: 2023,
    genre: ["Animation", "Fantasy"],
    category: "ANIMATION",
    dateAdded: Date.now() - 172800000,
  },
  {
    id: "12",
    title: "Color Burst",
    poster: "/adventure-fantasy-ocean-movie.jpg",
    rating: 7.7,
    year: 2024,
    genre: ["Animation", "Comedy"],
    category: "ANIMATION",
    dateAdded: Date.now() - 259200000,
  },
  // NOLLYWOOD
  {
    id: "13",
    title: "Lagos Stories",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 8.2,
    year: 2024,
    genre: ["Drama", "Romance"],
    category: "NOLLYWOOD",
    dateAdded: Date.now(),
  },
  {
    id: "14",
    title: "Heart of Africa",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 8.0,
    year: 2024,
    genre: ["Drama", "Romance"],
    category: "NOLLYWOOD",
    dateAdded: Date.now() - 86400000,
  },
  {
    id: "15",
    title: "Naija Dreams",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 7.9,
    year: 2023,
    genre: ["Drama", "Comedy"],
    category: "NOLLYWOOD",
    dateAdded: Date.now() - 172800000,
  },
  {
    id: "16",
    title: "Divine Love",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 8.3,
    year: 2024,
    genre: ["Drama", "Romance"],
    category: "NOLLYWOOD",
    dateAdded: Date.now() - 259200000,
  },
  // INDIAN
  {
    id: "17",
    title: "Bollywood Dreams",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 8.1,
    year: 2024,
    genre: ["Drama", "Romance"],
    category: "INDIAN",
    dateAdded: Date.now(),
  },
  {
    id: "18",
    title: "Monsoon Magic",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 7.8,
    year: 2024,
    genre: ["Drama", "Fantasy"],
    category: "INDIAN",
    dateAdded: Date.now() - 86400000,
  },
  {
    id: "19",
    title: "River of Souls",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 8.0,
    year: 2023,
    genre: ["Drama", "Spiritual"],
    category: "INDIAN",
    dateAdded: Date.now() - 172800000,
  },
  {
    id: "20",
    title: "Temple Bell",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 7.9,
    year: 2024,
    genre: ["Drama", "Romance"],
    category: "INDIAN",
    dateAdded: Date.now() - 259200000,
  },
  // TV SERIES
  {
    id: "21",
    title: "Crime Chronicles",
    poster: "/thriller-mystery-dark-movie-poster.jpg",
    rating: 8.4,
    year: 2024,
    genre: ["Thriller", "Mystery"],
    category: "TV-SERIES",
    dateAdded: Date.now(),
  },
  {
    id: "22",
    title: "Political Games",
    poster: "/thriller-mystery-dark-movie-poster.jpg",
    rating: 8.2,
    year: 2024,
    genre: ["Drama", "Thriller"],
    category: "TV-SERIES",
    dateAdded: Date.now() - 86400000,
  },
  {
    id: "23",
    title: "Dark Secrets",
    poster: "/psychological-thriller-movie-poster.jpg",
    rating: 8.3,
    year: 2023,
    genre: ["Thriller", "Mystery"],
    category: "TV-SERIES",
    dateAdded: Date.now() - 172800000,
  },
  {
    id: "24",
    title: "Urban Life",
    poster: "/thriller-mystery-dark-movie-poster.jpg",
    rating: 8.0,
    year: 2024,
    genre: ["Drama", "Comedy"],
    category: "TV-SERIES",
    dateAdded: Date.now() - 259200000,
  },
  // FAMILY
  {
    id: "25",
    title: "Family Adventures",
    poster: "/adventure-fantasy-ocean-movie.jpg",
    rating: 8.1,
    year: 2024,
    genre: ["Family", "Adventure"],
    category: "FAMILY",
    dateAdded: Date.now(),
  },
  {
    id: "26",
    title: "Holiday Magic",
    poster: "/adventure-fantasy-ocean-movie.jpg",
    rating: 7.9,
    year: 2024,
    genre: ["Family", "Comedy"],
    category: "FAMILY",
    dateAdded: Date.now() - 86400000,
  },
  {
    id: "27",
    title: "Kidz Paradise",
    poster: "/adventure-fantasy-ocean-movie.jpg",
    rating: 8.0,
    year: 2023,
    genre: ["Family", "Fantasy"],
    category: "FAMILY",
    dateAdded: Date.now() - 172800000,
  },
  {
    id: "28",
    title: "Summer Fun",
    poster: "/adventure-fantasy-ocean-movie.jpg",
    rating: 7.8,
    year: 2024,
    genre: ["Family", "Adventure"],
    category: "FAMILY",
    dateAdded: Date.now() - 259200000,
  },
  // RELIGIOUS
  {
    id: "29",
    title: "Faith Journey",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 8.2,
    year: 2024,
    genre: ["Drama", "Spiritual"],
    category: "RELIGIOUS",
    dateAdded: Date.now(),
  },
  {
    id: "30",
    title: "Blessed Path",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 8.0,
    year: 2024,
    genre: ["Drama", "Spiritual"],
    category: "RELIGIOUS",
    dateAdded: Date.now() - 86400000,
  },
  {
    id: "31",
    title: "Sacred Love",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 8.3,
    year: 2023,
    genre: ["Drama", "Romance"],
    category: "RELIGIOUS",
    dateAdded: Date.now() - 172800000,
  },
  {
    id: "32",
    title: "Divine Calling",
    poster: "/romantic-drama-movie-poster.jpg",
    rating: 8.1,
    year: 2024,
    genre: ["Drama", "Spiritual"],
    category: "RELIGIOUS",
    dateAdded: Date.now() - 259200000,
  },
]

export default function MovieGrid({ category }: { category: string }) {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    // Filter and sort movies - most recent first
    let filtered: Movie[] = []

    if (category === "LATEST-UPLOADS") {
      // Show all movies, sorted by most recent
      filtered = [...mockMovies]
    } else if (category === "all") {
      filtered = mockMovies
    } else {
      filtered = mockMovies.filter((m) => m.category === category)
    }

    // Sort by most recent first
    filtered.sort((a, b) => b.dateAdded - a.dateAdded)
    setMovies(filtered)
  }, [category])

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
