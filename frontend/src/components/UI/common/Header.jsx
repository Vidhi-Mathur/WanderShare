import { useState } from "react"
import { Compass } from "lucide-react"
import { Link } from "react-router-dom"

const headerLinks = [
    { title: "Featured", to: "/" },
    { title: "How it Works", to: "/" },
    { title: "Join", to: "/" 
}]

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className="sticky top-0 z-50 bg-card/60 backdrop-blur-xl border-b border-border/40 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-300">
                        <Compass className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-lg bg-linear-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:inline font-playfair">
                        WanderShare
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {headerLinks.map(headerLink => (
                        <Link to={headerLink.to} className="text-sm text-muted-foreground hover:text-accent transition-all duration-300 relative group font-poppins font-medium" key={headerLink.title}>
                        {headerLink.title}
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-accent to-primary group-hover:w-full transition-all duration-300 rounded-full" />
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/auth" className="hidden sm:inline-block px-4 py-2 text-sm text-foreground hover:text-accent transition-all duration-300 font-bold font-poppins">
                        Sign In
                    </Link>
                    <button className="px-4 py-2 bg-linear-to-r from-primary to-accent text-primary-foreground rounded-lg text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 font-poppins">
                        Get Started
                    </button>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground hover:text-accent transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border/50 bg-linear-to-b from-card/80 to-background/60 backdrop-blur-xl px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                    {headerLinks.map(headerLink => (
                        <Link to={headerLink.to} className="block text-sm text-muted-foreground hover:text-accent py-2 transition-all duration-300 font-poppins font-medium">
                        {headerLink.title}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    )
}
