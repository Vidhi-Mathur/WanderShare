import { useEffect, useState } from "react"
import { PlaceForm } from "../UI/places-related/PlaceForm"
import { useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"

export const EditPlacePage = () => {
    const { placeId } = useParams()
    const [place, setPlace] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchPlaceByPlaceId = async() => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/place/${placeId}`)
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
    
        useEffect(() => {
            fetchPlaceByPlaceId()
        },  [placeId])

    return (
        <>
        <main className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-teal-50 py-12 px-4">
            <div className="relative z-10">
                <div className="text-center mb-12">
                    <h1 className="font-playfair text-5xl md:text-6xl font-bold text-green-900 mb-4">Share Your Discovery</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Edit an existing destination on WanderShare and inspire fellow travelers with your favorite places and experiences.
                    </p>
                </div>
                {loading && (
                    <section className="flex items-center justify-center min-h-[50vh] px-4 md:px-8">
                        <div className="glass-card rounded-2xl px-8 py-10 text-center backdrop-blur-xl border border-white/50 shadow-xl">
                            <div className="flex flex-col items-center gap-4 text-primary">
                                <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                                <div>
                                    <h3 className="font-playfair text-xl font-bold text-green-900 mb-1">
                                        Loading Places
                                    </h3>
                                    <p className="text-sm text-gray-600 font-poppins">
                                        Fetching beautiful destinations for you...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                {!loading && error && (
                    <section className="flex flex-col items-center justify-center px-4 space-y-2 mb-4">
                        <TriangleAlert className="w-24 h-24 text-red-600" />
                        <div className="max-w-md w-full p-4 rounded-lg bg-red-600 text-white text-center font-medium shadow-md">
                            {error}
                        </div>
                    </section>
                )}
                {!loading && place && (
                    <div className="max-w-4xl mx-auto">
                        <PlaceForm mode="edit" initialData={place}/>
                    </div>
                )}
            </div>
        </main>
        </>
    )
}