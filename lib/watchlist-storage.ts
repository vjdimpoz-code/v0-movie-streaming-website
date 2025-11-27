export function getWatchlist(): string[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("watchlist")
  return stored ? JSON.parse(stored) : []
}

export function addToWatchlist(movieId: string): void {
  if (typeof window === "undefined") return
  const watchlist = getWatchlist()
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId)
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }
}

export function removeFromWatchlist(movieId: string): void {
  if (typeof window === "undefined") return
  const watchlist = getWatchlist().filter((id) => id !== movieId)
  localStorage.setItem("watchlist", JSON.stringify(watchlist))
}

export function isInWatchlist(movieId: string): boolean {
  return getWatchlist().includes(movieId)
}
