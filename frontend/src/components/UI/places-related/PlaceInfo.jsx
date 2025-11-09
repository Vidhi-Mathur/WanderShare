import { Heart, MapPin, Calendar } from "lucide-react"

export const PlaceInfo = ({ place, likeCount, isLiked, onLike }) => {
    const formatDate = (dateString) => (
        new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    )

    return (
        <div className="glass-card rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                    <h1 className="text-4xl font-playfair font-bold text-foreground mb-3">{place.name}</h1>
                    <div className="flex items-center gap-2 text-primary mb-4">
                        <MapPin size={20} />
                        <span className="font-poppins text-lg">{place.location.address}</span>
                    </div>
                </div>
                <button onClick={onLike} className="shrink-0 bg-white/90 hover:bg-white backdrop-blur-md p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Heart size={24} className={`transition-all duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`}/>
                </button>
            </div>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{place.description}</p>
            <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
                        <span className="font-poppins font-medium text-foreground">{likeCount} likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-poppins font-medium text-foreground">{place.reviews.length} reviews</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={18} />
                    <span className="font-poppins text-sm">{formatDate(place.createdAt)}</span>
                </div>
            </div>
        </div>
    ) 
}
