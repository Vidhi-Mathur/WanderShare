import { useContext, useState } from "react"
import { Star, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../utils/authContext"
import { formatDate } from "../../../utils/formatDate"

export const PlaceReview = ({ reviews, placeId }) => {
    const { token } = useContext(AuthContext)
    const [review, setReview] = useState({
        rating: 0,
        comment: ""
    })
    const [errors, setErrors] = useState([])
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
                const errors = result.errors? result.errors.map(err => err.msg): [result.message];
                throw { errors }
            }
            return result
        }
        catch(err){
            if(err.errors) setErrors(err.errors);     
            else setErrors([err.message || "Failed to post review, try again later..."]);
            
            
        }
        finally{
            setLoading(false)
        }
    }

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
                {token? (
                    <>
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
                            <textarea value={review.comment} onChange={(e) => setReview((prev) => ({ ...prev, comment: e.target.value }))} placeholder="Share your thoughts about this place..." className="flex-1 bg-background/50 border border-border rounded-lg px-4 py-3 font-poppins text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300 resize-none" rows={3} required/>
                            <button onClick={submitHandler} disabled={loading || !review.comment.trim()} className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white p-3 rounded-lg transition-colors duration-300">
                                {loading ? "..." : <Send size={20} />}
                            </button>
                        </div>
                        {errors && errors.length > 0 && (
                            <div className="mb-5 p-3 rounded-lg bg-destructive text-destructive-foreground text-left">
                                <ul className="list-disc pl-5 space-y-1">
                                    {errors.map((e, i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    </>
                ): (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4 font-poppins">Please log in to share your experience</p>
                        <Link to="/auth" className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors duration-300 font-poppins font-semibold">
                            Log In
                        </Link>
                    </div>
                )}
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
