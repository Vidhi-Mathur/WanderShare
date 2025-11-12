import { useContext, useEffect, useState } from "react"
import { Loader2, MapPin, Heart, MessageCircle, Star, TriangleAlert } from "lucide-react"
import { PlaceCard } from "../UI/places-related/PlaceCard"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../utils/authContext"

export const UserProfilePage = () => {
    const { token, details } = useContext(AuthContext)
    const params = useParams()
    let userId = params.userId || details?.id
    const [user, setUser] = useState(null)
    const [activeTab, setActiveTab] = useState("places")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchUserProfile = async() => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`)
                const result = await response.json()
                if(!response.ok) {
                    throw new Error(result.message)
              }
              setUser(result.user)
            } 
            catch(err){
              setError(err.message || "Failed to fetch profile, try again later")
            } 
            finally {
              setLoading(false)
            }
        }
        fetchUserProfile()
    }, [userId, token])

    if(loading){
        return (
            <main className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-foreground font-medium">Loading your profile...</p>
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

    if(!user){
        return (
            <main className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-foreground">User not found</p>
            </main>
        )
    }
    
    return (    
        <main className="min-h-screen bg-background">
            <div className="relative pt-8 pb-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-5xl mx-auto">
                    <div className="rounded-2xl p-8 mb-8 shadow-sm bg-card border border-border">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="w-32 h-32 rounded-2xl flex items-center justify-center text-4xl font-bold text-primary-foreground shrink-0 bg-linear-to-br from-primary to-accent">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold mb-2 text-card-foreground">{user.name}</h1>
                                <div className="grid grid-cols-3 gap-6">
                                    {[{ label: "Places", value: user.places?.length || 0 },
                                      { label: "Liked", value: user.likedPlaces?.length || 0 },
                                      { label: "Reviews", value: user.reviews?.length || 0 }].map((stat, idx) => (
                                        <div key={idx}>
                                            <p className="text-2xl font-bold text-primary">{stat.value}</p>
                                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="flex gap-4 border-b border-border">
                            {["places", "liked", "reviews"].map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>
                                    {tab === "places" && "My Places"}
                                    {tab === "liked" && "Liked Places"}
                                    {tab === "reviews" && "My Reviews"}
                                </button>
                            ))}
                        </div>
                    </div>
                    {activeTab === "places" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-card-foreground">Places I've Shared</h2>
                            {user.places?.length? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {user.places.map((place) => (
                                      <PlaceCard place={place} key={place._id} />
                                    ))}
                                </div>
                            ): (
                                <div className="text-center py-12 rounded-2xl bg-input text-muted-foreground">
                                    <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-lg">No places shared yet</p>
                                </div>
                            )}
                        </div>
                    )}  
                    {activeTab === "liked" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-card-foreground">Places I've Liked</h2>
                            {user.likedPlaces?.length? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {user.likedPlaces.map((place) => (
                                        <PlaceCard key={place._id} place={place} />
                                    ))}
                                </div>
                            ): (
                                <div className="text-center py-12 rounded-2xl bg-input text-muted-foreground">
                                    <Heart size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-lg">No liked places yet</p>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === "reviews" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-card-foreground">My Reviews</h2>
                            {user.reviews?.length? (
                                <div className="space-y-4">
                                    {user.reviews.map((review, idx) => (
                                        <div key={idx} className="p-6 rounded-2xl bg-card border border-border">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <p className="font-semibold text-card-foreground">{review.place?.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {review.place?.location?.address}
                                                    </p>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} className={`${i < review.rating? "fill-yellow-400 text-yellow-400": "text-gray-300" }`}/>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-card-foreground">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ): (
                                <div className="text-center py-12 rounded-2xl bg-input text-muted-foreground">
                                    <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-lg">No reviews written yet</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )       
}
