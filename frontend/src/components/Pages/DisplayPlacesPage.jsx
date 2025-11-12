import { useCallback, useState } from "react";
import { PlaceCard } from "../UI/places-related/PlaceCard"
import { useEffect } from "react";
import { SearchFilterBar } from "../UI/places-related/SearchFilterBar";
import { Loader2 } from "lucide-react";

export const DisplayPlacesPage = () => {
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [queryParams, setQueryParams] = useState({
        search: "",
        sortBy: "newest",
        filterDate: "all",
        filterRating: "all",
    })

    const fetchPlaces = useCallback(async() => {
        setLoading(true)
        setError(null)
        try {
            const params = new URLSearchParams()
            if(queryParams.search) params.append("search", queryParams.search)
            params.append("sortBy", queryParams.sortBy)
            params.append("filterDate", queryParams.filterDate)
            params.append("filterRating", queryParams.filterRating)
            const response = await fetch(`http://localhost:3000/place?${params.toString()}`)
            const result = await response.json()
            if(!response.ok){
                throw new Error(result.message)
            }
            setPlaces(result.places)
            return result
        } 
        catch(err){
          setError(err.message || "Failed to fetch places, try again later")
        } 
        finally {
          setLoading(false)
        }
    }, [queryParams])

    useEffect(() => {
        fetchPlaces()
    }, [fetchPlaces])

    return (
        <div className="relative z-10">
            <section className="pt-20 pb-12 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-4">Explore Places</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover incredible destinations shared by our global travel community
                        </p>
                    </div>
                    <SearchFilterBar filters={queryParams} setFilters={setQueryParams} />
                </div>
            </section>
            {error && (
                <section className="px-4 md:px-8 pb-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="p-4 rounded-lg bg-destructive text-destructive-foreground">{error}</div>
                    </div>
                </section>
            )}
            {loading && places.length === 0 && (
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
            {places.length > 0 && (
                <section className="px-4 md:px-8 pb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {places.map((place) => (
                                <PlaceCard key={place._id} place={place} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {!loading && places.length === 0 && !error && (
                <section className="px-4 md:px-8 pb-20">
                    <div className="max-w-6xl mx-auto text-center text-muted-foreground">
                        <p>No places found. Try adjusting your filters.</p>
                    </div>
                </section>
            )}
        </div>
    )
}
