import { Button } from "@/components/ui/button"
import { Play, Plus, Volume2 } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/placeholder.svg?height=600&width=1920&query=epic-movie-hero-cinematic-dark)",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <p className="text-accent text-sm md:text-base font-semibold tracking-wider uppercase">Featured</p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">Epic Adventure Awaits</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl text-pretty">
              Join us on an unforgettable journey through stunning cinematography and captivating storytelling.
            </p>
          </div>

          {/* Rating and Info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded font-semibold">PG-13</span>
            </div>
            <span className="text-muted-foreground">2024</span>
            <span className="text-muted-foreground">2h 45m</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-lg">
              <Play className="w-5 h-5" />
              Play Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/20 text-foreground hover:bg-foreground/10 gap-2 rounded-lg bg-transparent"
            >
              <Plus className="w-5 h-5" />
              Watchlist
            </Button>
          </div>
        </div>
      </div>

      {/* Volume Control - visible on hover */}
      <button className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition opacity-0 group-hover:opacity-100">
        <Volume2 className="w-5 h-5 text-foreground" />
      </button>
    </div>
  )
}
