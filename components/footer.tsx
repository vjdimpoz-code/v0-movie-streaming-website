import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">StreamFlix</h4>
              <p className="text-sm text-muted-foreground">Your destination for unlimited movies and entertainment.</p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Browse</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/browse" className="text-muted-foreground hover:text-foreground transition">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="text-muted-foreground hover:text-foreground transition">
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="text-muted-foreground hover:text-foreground transition">
                    Trending
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Account</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/account" className="text-muted-foreground hover:text-foreground transition">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="/watchlist" className="text-muted-foreground hover:text-foreground transition">
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="text-muted-foreground hover:text-foreground transition">
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2025 StreamFlix. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/" className="hover:text-foreground transition">
                Facebook
              </Link>
              <Link href="/" className="hover:text-foreground transition">
                Twitter
              </Link>
              <Link href="/" className="hover:text-foreground transition">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
