import { Compass } from "lucide-react"
import { Link } from "react-router-dom"

const footerLinks = [{
    title: "Platform",
    links: ["Explore Destinations", "Upload Photos", "Community", "Leaderboard"],
  }, {
    title: "Company",
    links: ["About Us", "Blog", "Careers", "Press"],
  }, {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Contact", "Cookie Policy"],
}]


export const Footer = () => {
    return (
        <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
                                    <Compass className="w-4 h-4 text-primary-foreground" />
                                </div>
                                <span className="font-bold text-lg text-foreground">WanderShare</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Share your travel stories with a thriving community of adventurers.
                            </p>
                        </div>
                        {footerLinks.map((section) => (
                            <div key={section.title}>
                                <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                                  {section.title}
                                </h4>
                                <ul className="space-y-3 text-sm">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <Link to="/" className="text-muted-foreground hover:text-accent transition-all duration-300">{link}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                          ©2025 WanderShare. Crafted with love for travelers, by travelers.
                        </p>
                        <div className="text-xs text-muted-foreground">Made with ❤️ • Exploring the world together</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
