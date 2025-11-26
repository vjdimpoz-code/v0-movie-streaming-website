"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="px-4 md:px-8 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">DIMPOZ MOVIES</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/browse" className="text-muted-foreground hover:text-foreground transition">
              Browse
            </Link>
            <Link href="/search" className="text-muted-foreground hover:text-foreground transition">
              Search
            </Link>
            <Link href="/watchlist" className="text-muted-foreground hover:text-foreground transition">
              Watchlist
            </Link>
            <Link href="/subscribe" className="text-muted-foreground hover:text-foreground transition">
              Subscribe
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/search" className="p-2 hover:bg-card rounded-lg transition">
              <Search className="w-5 h-5 text-foreground" />
            </Link>
            <Link href="/account">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">Sign In</Button>
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-card rounded-lg transition">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-border pt-4">
            <Link href="/browse" className="text-foreground hover:text-primary transition py-2">
              Browse
            </Link>
            <Link href="/search" className="text-foreground hover:text-primary transition py-2">
              Search
            </Link>
            <Link href="/watchlist" className="text-foreground hover:text-primary transition py-2">
              Watchlist
            </Link>
            <Link href="/subscribe" className="text-foreground hover:text-primary transition py-2">
              Subscribe
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
