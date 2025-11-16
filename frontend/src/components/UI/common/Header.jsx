import { useContext, useState } from "react"
import { Compass, MenuIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { DropDownMenu } from "./DropDownMenu"
import { AuthContext } from "../../../utils/authContext"

const headerLinks = [
    { title: "Featured", targetId: "gallery" },
    { title: "How it Works", targetId: "experience" },
    { title: "Join", targetId: "join" }
]

const scrollHandler = (id) => {
    if(location.pathname === "/"){
        const el = document.getElementById(id)
        if (el){
            el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }
    else window.location.href = `/#${id}`
}

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { token } = useContext(AuthContext)
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
                        <button key={headerLink.title} className="text-sm text-muted-foreground hover:text-accent transition-all duration-300 relative group font-poppins font-medium" onClick={() => scrollHandler(headerLink.targetId)}>
                        {headerLink.title}
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-accent to-primary group-hover:w-full transition-all duration-300 rounded-full" />
                        </button>
                    ))}
                    <Link to="/places" className="text-sm text-muted-foreground hover:text-accent transition-all duration-300 relative group font-poppins font-medium">
                        Explore
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-accent to-primary group-hover:w-full transition-all duration-300 rounded-full" />
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    {token? (
                        <DropDownMenu />
                    ): (
                    <Link to="/auth" className="px-4 py-2 bg-linear-to-r from-primary to-accent text-primary-foreground rounded-lg text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 font-poppins">
                        Sign In
                    </Link>
                    )}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground hover:text-accent transition-all duration-300">
                        <MenuIcon />
                    </button>
                </div>
            </nav>
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border/50 bg-linear-to-b from-card/80 to-background/60 backdrop-blur-xl px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                    {headerLinks.map(headerLink => (
                        <button onClick={() => {
                            scrollHandler(headerLink.targetId)
                            setMobileMenuOpen(false)
                        }} key={headerLink.title} className="block text-sm text-muted-foreground hover:text-accent py-2 transition-all duration-300 font-poppins font-medium">
                        {headerLink.title}
                        </button>
                    ))}
                    <Link to="/places" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-muted-foreground hover:text-accent py-2 transition-all duration-300 font-poppins font-medium">
                        Explore
                    </Link>
                </div>
            )}
        </header>
    )
}
