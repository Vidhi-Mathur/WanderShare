import { useEffect, useState } from "react"
import { Heart, MapPin, Calendar, MessageCircle, TriangleAlert } from "lucide-react"
import { Link } from "react-router-dom"
import { toggleLikePlace } from "../../../services/LikeService"
import { useContext } from "react"
import { formatDate } from "../../../utils/formatDate"
import { AuthContext } from "../../../utils/authContext"

export const PlaceCard = ({ place }) => {
    const { token, details } = useContext(AuthContext)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(place?.likes?.length || 0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const likeToggler = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await toggleLikePlace(place._id, token)
            setIsLiked(result.liked ?? !isLiked)
            setLikeCount(result.likesCount ?? (isLiked ? likeCount - 1 : likeCount + 1))
        } 
        catch(err){
          setError(err.message)
        } 
        finally {
          setLoading(false)
        }
    }

    useEffect(() => {
        if(place && details?.id){
          const userHasLiked = place.likes?.some(like => like === details.id || like?._id === details.id) || false
          setIsLiked(userHasLiked)
          setLikeCount(place.likes?.length || 0)
        }
    }, [place, details?.id])

    return (
        <Link to={`/place/${place._id}`} className="block w-full">
            <div className="group cursor-pointer h-full">
                <div className="glass-card rounded-2xl overflow-hidden hover-lift h-full flex flex-col transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-64 overflow-hidden bg-muted">
                      <img src={place?.images?.[0]} alt={place?.name || "Place"} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"/>
                        {(place?.images?.length || 0) > 1 && (
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-poppins font-medium">
                              +{place.images.length - 1} more
                            </div>
                        )}
                        {token && (
                            <button onClick={likeToggler} disabled={loading} className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md hover:bg-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                                <Heart size={20} className={`transition-all duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                            </button>
                        )}
                        {error && (
                            <div className="absolute bottom-16 right-3 flex items-center gap-2 bg-red-500 text-white text-xs px-4 py-2 rounded-full shadow-md animate-fade-in">
                                <TriangleAlert className="w-4 h-4 text-white" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}
                    </div>
                    <div className="p-6 flex flex-col grow">
                        <div className="flex items-center gap-2 mb-3 text-sm text-primary">
                            <MapPin size={16} className="shrink-0" />
                            <span className="truncate text-sm font-poppins">{place?.location?.address || "N/A"}</span>
                        </div>
                        <h3 className="text-xl font-playfair font-bold text-foreground mb-3 group-hover:gradient-text transition-all line-clamp-2">
                            {place?.name || "Untitled Place"}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-5 grow">
                            {place?.description || "No description available"}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground font-poppins">
                                <div className="flex items-center gap-1">
                                    <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : ""} />
                                    <span>{likeCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={16} />
                                    <span>{place?.reviews?.length || 0}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground font-poppins">
                                <Calendar size={14} />
                                <span>{formatDate(place?.createdAt)}</span>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </Link>
    )   
}
