import { useState } from "react"
import { Heart, MapPin, Calendar, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

export const PlaceCard = ({ place }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(place.likes.length)

    const handleLike = (e) => {
        e.preventDefault()
        setIsLiked(!isLiked)
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    }

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })

    return (
        <Link to={`/place/${place._id}`} className="block w-full">
            <div className="group cursor-pointer h-full">
                <div className="glass-card rounded-2xl overflow-hidden hover-lift h-full flex flex-col transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-64 overflow-hidden bg-muted">
                        <img src={place.images[0] || "/placeholder.svg"} alt={place.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"/>
                        {place.images.length > 1 && (
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-poppins font-medium">
                                +{place.images.length - 1} more
                            </div>
                        )}
                        <button onClick={handleLike} className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md hover:bg-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl" >
                            <Heart size={20} className={`transition-all duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                        </button>
                    </div>
                    <div className="p-6 flex flex-col grow">
                        <div className="flex items-center gap-2 mb-3 text-sm text-primary">
                            <MapPin size={16} className="shrink-0" />
                            <span className="truncate text-sm font-poppins">{place.location.address}</span>
                        </div>
                        <h3 className="text-xl font-playfair font-bold text-foreground mb-3 group-hover:gradient-text transition-all line-clamp-2">
                            {place.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-5 grow">{place.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground font-poppins">
                                <div className="flex items-center gap-1">
                                    <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : ""} />
                                    <span>{likeCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={16} />
                                    <span>{place.reviews.length}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground font-poppins">
                                <Calendar size={14} />
                                <span>{formatDate(place.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}   
