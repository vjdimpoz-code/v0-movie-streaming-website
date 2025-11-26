"use client"

import MovieCard from "./movie-card"

const recommendedMovies = [
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

export default function MovieRecommendations() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {recommendedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
