import { ArrowRight, Sparkles, Flame } from "lucide-react"
import DilliHaat from "../../../assets/Dilli_Haat.jpg"

export const HeroSection = () => {
  return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
            <div className="absolute inset-0">
                <div className="glow-blob-1 absolute top-20 left-1/3 w-80 h-80 rounded-full blur-3xl bg-primary/30" />
                <div className="glow-blob-2 absolute bottom-32 right-1/4 w-96 h-96 rounded-full blur-3xl bg-accent/30" />
                <div className="glow-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl bg-primary-light/40" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 z-10">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/20 border border-primary/40 rounded-full hover:border-primary/60 transition-all group cursor-pointer">
                                <Sparkles className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                                <span className="text-sm font-semibold text-primary">Join Fellow Travelers</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/15 border border-accent/30 rounded-full hover:border-accent/60 transition-all ml-3 group cursor-pointer">
                                <Flame className="w-4 h-4 text-accent group-hover:animate-bounce transition-all" />
                                <span className="text-sm font-semibold text-accent">Trending Worldwide</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h1 className="font-playfair text-7xl sm:text-8xl lg:text-8xl font-bold leading-tight">
                                <span className="block text-foreground">Every Journey</span>
                                <span className="block bg-linear-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent drop-shadow-sm">Tells a Story</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl font-light font-poppins">
                                Discover authentic travel experiences through the eyes of real travelers. Share your moments, explore hidden gems, and build connections with fellow wanderers across the globe.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-8">
                            <button className="group relative px-8 py-4 bg-linear-to-r from-primary to-accent text-primary-foreground rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all overflow-hidden">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Start Discovering
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="px-8 py-4 border-2 border-primary/50 text-primary rounded-2xl font-bold text-lg hover:bg-primary/10 hover:border-primary transition-all">
                              Explore Gallery
                            </button>
                        </div>
                    </div>
                    <div className="relative h-96 sm:h-full lg:h-screen max-h-[600px] lg:max-h-none">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute w-72 h-96 bg-linear-to-br from-primary-light/40 to-accent/30 rounded-3xl border border-white/20 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 hover:-translate-y-2 group cursor-pointer -rotate-12 hover:rotate-0">
                                <div className="absolute inset-4 bg-linear-to-br from-white/10 to-transparent rounded-2xl" />
                                <div className="relative p-8 h-full flex flex-col justify-end">
                                    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4" />
                                </div>
                            </div>
                            <div className="relative w-72 h-96 bg-linear-to-br from-accent/40 to-primary/30 rounded-3xl border border-white/20 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 hover:translate-y-2 group cursor-pointer rotate-12 hover:rotate-0">
                                <div className="absolute top-6 left-6 right-6 h-60 rounded-2xl overflow-hidden shadow-md">
                                    <img src={DilliHaat} alt="Dilli Haat, INA" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute inset-4 bg-linear-to-br from-white/10 to-transparent rounded-2xl" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
                                        <p className="text-white font-bold text-lg">Dilli Haat, INA</p>
                                        <p className="text-white/80 text-sm">4.8★ • 8.5K reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
