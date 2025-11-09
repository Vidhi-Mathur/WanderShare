import { ArrowRight, Sparkles, Zap } from "lucide-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../store/Auth-Context"

export const JoinNowSection = () =>{
    const { token } = useContext(AuthContext)
    return (
        <section className="py-40 bg-linear-to-b from-background to-primary-light/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent-light/20 border border-accent/40 rounded-full">
                            <Sparkles className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: "3s" }} />
                            <span className="text-sm font-bold text-accent uppercase tracking-widest font-poppins">
                                Limited Time Offer
                            </span>
                        </div>
                        <h2 className="font-playfair text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground">
                          Start Your Journey{" "}
                            <span className="block bg-linear-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent drop-shadow-sm">
                                Today
                            </span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light font-poppins">
                          Join our global community of global travelers. Share your stories, discover hidden gems, and connect with wanderers around the world.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link to={`${token? '/add-place': '/access-denied'}`} className="group relative px-10 py-5 bg-linear-to-r from-primary to-accent text-primary-foreground rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all overflow-hidden font-poppins">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-linear-to-r from-primary-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>
                    <div className="pt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-poppins">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-primary to-accent" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-accent to-primary" />
                            <span>Start in seconds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-primary-light to-accent" />
                            <span>Join fellow travelers</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
