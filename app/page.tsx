import Header from "@/components/header"
import Hero from "@/components/hero"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"

const GENRES = [
  { id: "LATEST-UPLOADS", label: "LATEST UPLOADS" },
  { id: "ACTION", label: "ACTION" },
  { id: "NOLLYWOOD", label: "NOLLYWOOD" },
  { id: "INDIAN", label: "INDIAN" },
  { id: "ANIMATION", label: "ANIMATION" },
  { id: "SCI-FI", label: "SCI-FI" },
  { id: "TV-SERIES", label: "TV SERIES" },
  { id: "FAMILY", label: "FAMILY" },
  { id: "RELIGIOUS", label: "RELIGIOUS" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />

      {GENRES.map((genre) => (
        <section key={genre.id} className="px-4 md:px-8 lg:px-12 py-12 hover:bg-card/20 transition-colors">
          <div className="max-w-full mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance">{genre.label}</h2>
            <MovieGrid category={genre.id} />
          </div>
        </section>
      ))}

      <Footer />
    </main>
  )
}
