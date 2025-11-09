import { useContext, useState } from "react"
import { Star, Send } from "lucide-react"
import { AuthContext } from "../../../store/Auth-Context"

export const PlaceReview = ({ reviews, placeId }) => {
    const { token } = useContext(AuthContext)
    const [review, setReview] = useState({
        rating: 0,
        comment: ""
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const submitHandler = async() => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/review/${placeId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(review)    
            })
            const result = await response.json()
            if(!response.ok){
                throw new Error(result.message)
            }
            return result
        }
        catch(err){
            setError(err.message || "Failed to post review, try again later.")
        }
        finally{
            setLoading(false)
        }
    }

    const formatDate = (dateString) => (
        new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    )

    const averageRating = reviews.length > 0? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1): 0

    return (
        <div className="glass-card rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-playfair font-bold text-foreground">Reviews</h2>
                <div className="text-center">
                    <div className="text-3xl font-playfair font-bold text-primary">{averageRating}</div>
                    <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={i < Math.round(averageRating)? "fill-yellow-400 text-yellow-400": "text-gray-300" } />
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{reviews.length} reviews</p>
                </div>
            </div>
            <div className="mb-8 pb-8 border-b border-border">
                <h3 className="font-poppins font-semibold text-foreground mb-4">Share your experience</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-poppins text-muted-foreground">Your rating:</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <button key={i} onClick={() => setReview((prev) => ({ ...prev, rating: i + 1 }))} className="transition-transform duration-300 hover:scale-110">
                                    <Star size={24} className={`${i < review.rating? "fill-yellow-400 text-yellow-400": "text-gray-300" } transition-colors duration-300`}/>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <textarea value={review.comment} onChange={(e) => setReview((prev) => ({ ...prev, comment: e.target.value }))} placeholder="Share your thoughts about this place..." className="flex-1 bg-background/50 border border-border rounded-lg px-4 py-3 font-poppins text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300 resize-none" rows={3} />
                        <button onClick={submitHandler} disabled={loading || !review.comment.trim() || review.rating === 0} className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white p-3 rounded-lg transition-colors duration-300">
                            {loading ? "..." : <Send size={20} />}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </div>
            <div className="space-y-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="pb-6 last:pb-0 border-b border-border last:border-0">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="font-poppins font-semibold text-foreground">
                                        {review.reviewer?.name || "Anonymous"}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(review.createdAt)}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className={`${i < review.rating? "fill-yellow-400 text-yellow-400": "text-gray-300" }`}/>
                                    ))}
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-8">
                        No reviews yet. Be the first to review this place!
                    </p>
                )}
            </div>
        </div>
    )
}
