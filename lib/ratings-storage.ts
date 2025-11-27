export function getRatings(): Record<string, number> {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem("ratings")
  return stored ? JSON.parse(stored) : {}
}

export function setRating(movieId: string, rating: number): void {
  if (typeof window === "undefined") return
  const ratings = getRatings()
  ratings[movieId] = rating
  localStorage.setItem("ratings", JSON.stringify(ratings))
}

export function getRating(movieId: string): number {
  return getRatings()[movieId] || 0
}
