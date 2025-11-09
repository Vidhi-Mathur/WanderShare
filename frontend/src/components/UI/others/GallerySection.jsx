import { Heart, MessageCircle, Star, TrendingUp, MapPin, Share2, ArrowRight } from "lucide-react"
import { useState } from "react"
import ChandniChowk from '../../../assets/Chandni_Chowk.jpg';
import IndiaGate from '../../../assets/India_Gate.jpg';
import HauzKhas from '../../../assets/Hauz_Khas.jpg';
import LotusTemple from '../../../assets/Lotus_Temple.jpg';
import DamdamaLake from '../../../assets/Damdama_Lake.jpg';
import QutubMinar from '../../../assets/Qutub_Minar.jpg';
import { Link } from "react-router-dom";

const galleryItems = [
  {
    id: 1,
    title: "Street Food Trail at Chandni Chowk",
    location: "Old Delhi",
    image: ChandniChowk,
    likes: 3187,
    comments: 421,
    rating: 4.9,
    user: "Aarav Mehta",
    height: "h-96",
    span: "col-span-2",
  },
  {
    id: 2,
    title: "Sunset at India Gate",
    location: "Central Delhi",
    image: IndiaGate,
    likes: 2841,
    comments: 312,
    rating: 4.8,
    user: "Priya Sharma",
    height: "h-72",
    span: "col-span-1",
  },
  {
    id: 3,
    title: "Cafe Hopping in Hauz Khas Village",
    location: "South Delhi",
    image: HauzKhas,
    likes: 2567,
    comments: 278,
    rating: 4.7,
    user: "Rohan Verma",
    height: "h-72",
    span: "col-span-1",
  },
  {
    id: 4,
    title: "Lotus Temple Serenity",
    location: "Kalkaji, Delhi",
    image: LotusTemple,
    likes: 2334,
    comments: 251,
    rating: 4.8,
    user: "Neha Gupta",
    height: "h-80",
    span: "col-span-1",
  },
  {
    id: 5,
    title: "Weekend Escape at Damdama Lake",
    location: "Gurugram, Haryana",
    image: DamdamaLake,
    likes: 1926,
    comments: 189,
    rating: 4.6,
    user: "Kabir Singh",
    height: "h-80",
    span: "col-span-1",
  },
  {
    id: 6,
    title: "Historic Walk at Qutub Minar",
    location: "Mehrauli, Delhi",
    image: QutubMinar,
    likes: 2684,
    comments: 334,
    rating: 4.9,
    user: "Ananya Patel",
    height: "h-80",
    span: "col-span-1",
  },
];

export const GallerySection = () => {
    const [likedIds, setLikedIds] = useState([])

    const likeToggler = (id) => {
        setLikedIds((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]))
    }

    return (
        <section className="py-32 bg-linear-to-b from-background via-primary-light/5 to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6 mb-20">
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-12 bg-linear-to-r from-primary via-accent to-primary-light rounded-full" />
                        <span className="text-xs font-bold text-accent uppercase tracking-widest font-poppins">
                          Community Highlights
                        </span>
                    </div>
                    <div>
                        <h2 className="font-playfair text-6xl sm:text-7xl font-bold text-foreground mb-4">Curated Moments</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl font-light leading-relaxed font-poppins">
                            Hand-picked travel moments from our global community. Each photo tells a story worth experiencing.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
                    {galleryItems.map((item) => (
                        <div key={item.id} className={`${item.span} group cursor-pointer relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-accent/50 transition-all hover:shadow-xl`}>
                            <div className={`relative overflow-hidden ${item.height} photo-frame`}>
                                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-white/25 backdrop-blur-md rounded-full border border-white/30">
                                            <TrendingUp className="w-4 h-4 text-white" />
                                            <span className="text-xs font-bold text-white font-poppins">Trending Now</span>
                                        </div>
                                            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all border border-white/20">
                                            <Share2 className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                    <button className="px-6 py-3 bg-linear-to-r from-primary to-accent hover:from-primary-dark hover:to-primary text-primary-foreground rounded-xl font-bold transition-all w-full font-poppins">
                                        View Details
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 space-y-4 bg-linear-to-b from-background/50 to-background">
                                <div>
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-playfair font-bold text-xl text-foreground group-hover:text-accent transition-colors">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1 font-poppins">
                                                <MapPin className="w-3.5 h-3.5 text-accent" />
                                                {item.location}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-linear-to-br from-accent/40 to-primary/30 px-3 py-2 rounded-xl border border-accent/20">
                                            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                                            <span className="text-sm font-bold text-foreground font-poppins">{item.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-poppins">by {item.user}</p>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => likeToggler(item.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all group/like font-poppins">
                                            <Heart className={`w-4 h-4 transition-all ${likedIds.includes(item.id)? "fill-accent text-accent scale-110": "text-muted-foreground group-hover/like:text-accent" }`}/>
                                            <span className={`text-xs font-semibold transition-colors ${likedIds.includes(item.id)? "text-accent" : "text-muted-foreground" }`}>
                                                {item.likes + (likedIds.includes(item.id) ? 1 : 0)}
                                            </span>
                                        </button>
                                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-accent/10 transition-all group/comment font-poppins">
                                            <MessageCircle className="w-4 h-4 text-muted-foreground group-hover/comment:text-accent transition-colors" />
                                            <span className="text-xs font-semibold text-muted-foreground group-hover/comment:text-foreground transition-colors">
                                                {item.comments}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-20">
                    <Link to="/places" className="group relative inline-flex items-center justify-center px-10 py-4 bg-linear-to-r from-primary to-accent text-primary-foreground rounded-2xl font-bold text-lg hover:shadow-2xl transition-all overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-2 font-poppins">
                            Explore Full Gallery
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    ) 
}
