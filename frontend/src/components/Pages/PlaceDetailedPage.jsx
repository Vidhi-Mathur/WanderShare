import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { PlaceImageGallery } from "../UI/places-related/PlaceImageGallery"
import { PlaceInfo } from "../UI/places-related/PlaceInfo"
import { PlaceReview } from "../UI/places-related/PlaceReview"
import { Loader2, TriangleAlert } from "lucide-react"
import { toggleLikePlace } from "../../services/LikeService"
import { AuthContext } from "../../utils/authContext"

export const PlaceDetailedPage = () => {
    const params = useParams()
    const { token, details } = useContext(AuthContext);
    const placeId = params.placeId
    const [place, setPlace] = useState()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [likeCount, setLikeCount] = useState(place?.likes.length || 0)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(null)
        const fetchPlaceByPlaceId = async() => {
            try {
                const response = await fetch(`http://localhost:3000/place/${placeId}`)
                const result = await response.json()
                if(!response.ok){
                    throw new Error(result.message)
                }
                setPlace(result.place)
                return result
            }
            catch(err){
                setError(err.message || "Failed to fetch place, try again later.")
            }
            finally{
                setLoading(false)
            }
        }
        fetchPlaceByPlaceId()
    },  [placeId])

    useEffect(() => {
        if(place && details?.id) {
            const userHasLiked = place.likes.some(like => 
                like === details?.id || like._id === details?.id
            )
            setIsLiked(userHasLiked)
            setLikeCount(place.likes.length)
        }
    }, [place, details?.id])


   if(loading){
        return (
            <main className="min-h-screen flex flex-col items-center justify-center text-primary bg-linear-to-b from-background to-muted">
                <div className="glass-card rounded-2xl px-10 py-12 text-center backdrop-blur-xl border border-white/40 shadow-xl">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                        <div>
                            <h2 className="font-playfair text-2xl font-bold text-green-900 mb-1">
                              Loading Place Details
                            </h2>
                            <p className="text-sm text-gray-600 font-poppins">
                              Hang tight — exploring new destinations for you...
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }   


    if(error){
        return (
            <main className="min-h-screen flex flex-col items-center justify-center px-4 space-y-3">
                <TriangleAlert className="w-24 h-24 text-red-600" />
                <div className="max-w-md w-full p-4 rounded-lg bg-red-600 text-white text-center font-medium shadow-md">
                    {error}
                </div>
            </main>
        )
    }

    if(!place){
        return (
            <main className="min-h-screen flex items-center justify-center text-muted-foreground">
                <p>Place not found.</p>
            </main>
        )
    }


    const likeToggler = async(e) => {
        e.preventDefault()
        try {
            const result = await toggleLikePlace(place._id, token);
            setIsLiked(result.liked ?? !isLiked);
            setLikeCount(result.likesCount ?? (isLiked ? likeCount - 1 : likeCount + 1));
        } 
        catch(err){
            setError(err.message)
        } 
    }

    return (
        <main className="min-h-screen relative">
            <div className="relative z-10">
                <div className="pt-24 pb-16 px-4 md:px-8 lg:px-16">
                    <div className="max-w-5xl mx-auto">
                        <PlaceImageGallery images={place.images} />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                            <div className="lg:col-span-2">
                                <PlaceInfo place={place} likeCount={likeCount} isLiked={isLiked} onLike={likeToggler} />
                            </div>
                            <div className="lg:col-span-1">
                                <div className="glass-card rounded-2xl p-6 backdrop-blur-xl">
                                    <h3 className="text-lg font-playfair font-bold text-foreground mb-4">Added by</h3>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold mb-3">
                                            {place.creator.name.charAt(0)}
                                        </div>
                                        <h4 className="font-poppins font-semibold text-foreground text-lg">
                                            {place.creator.name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-4">{place.creator._id}</p>
                                        <Link to={`/user/${place.creator._id}`} className="w-full py-2 bg-primary text-white rounded-lg font-poppins font-medium hover:bg-primary/90 transition-colors duration-300">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16">
                            <PlaceReview reviews={place.reviews} placeId={place._id} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}