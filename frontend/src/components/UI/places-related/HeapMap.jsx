import "leaflet.heat"
import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import { Loader2, TriangleAlert } from "lucide-react"
import { PlaceCard } from "./PlaceCard"

export const HeatMap = () => {
    const [error, setError] = useState(null)
    const [mapLoading, setMapLoading] = useState(true)
    const [nearbyLoading, setNearbyLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const [places, setPlaces] = useState([])
    const mapRef = useRef(null)
    const containerRef = useRef(null)
    useEffect(() => {
        const initMap = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/place/heatmap`)
                const result = await response.json()
                if(!response.ok){
                    throw new Error(result.message)
                }
                if(!containerRef.current) return
                mapRef.current = L.map(containerRef.current).setView([28.6139, 77.2090], 5)
                L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png").addTo(mapRef.current)
                if(result.points?.length){
                    const heat = L.heatLayer(result.points, {
                        radius: 65,
                        blur: 45,
                        maxZoom: 12,
                        minOpacity: 0.5,
                        gradient: {
                            0.1: "#00bfff",
                            0.3: "#00ffcc",
                            0.5: "#ffff66",
                            0.7: "#ff9933",
                            0.9: "#ff3300"
                        }
                    })
                    heat.addTo(mapRef.current)
                    mapRef.current.fitBounds(result.points.map(p => [p[0], p[1]]))
                }
                mapRef.current.on("click", async (e) => {
                    const { lat, lng } = e.latlng
                    const zoom = mapRef.current.getZoom()
                    setSelected(true)
                    setNearbyLoading(true)
                    setError(null)
                    try {
                        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/place/nearby?lat=${lat}&lng=${lng}&zoom=${zoom}`)
                        const result = await response.json()
                        if(!response.ok){
                            throw new Error(result.message)
                        }
                        setPlaces(result.places)
                    } 
                    catch(err){
                        setError(err.message || "Failed to fetch nearby places")
                    }
                    finally {
                        setNearbyLoading(false)
                    }
                })
            } 
            catch(err){
                setError(err.message || "Failed to load heatmap")
            } 
            finally {
                setMapLoading(false)
            }
        }
        initMap()
        return () => {
            if(mapRef.current) {
                mapRef.current.remove()
            }
        }
    }, [])

    return (
        <>
            {mapLoading && (
                <main className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                </main>
            )}
            {!mapLoading && error && (
                <main className="min-h-screen flex flex-col items-center justify-center gap-3">
                    <TriangleAlert className="w-16 h-16 text-red-600" />
                    <div className="bg-red-600 text-white px-6 py-3 rounded-lg">
                        {error}
                    </div>
                </main>
            )}
            {!mapLoading && !error && (
                <>
                    <div ref={containerRef} className="w-full h-[80vh] rounded-xl z-0"/>
                    <div className="max-w-7xl mx-auto mt-10 px-4 mb-10">
                        <h2 className="text-2xl font-semibold mb-6">Places Near This Location</h2>
                        {!selected && (
                            <p className="text-gray-500">Click anywhere on the map to explore places around that area.</p>
                        )}
                        {nearbyLoading && (
                            <div className="flex justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-emerald-600"/>
                            </div>
                        )}
                        {!nearbyLoading && selected && places.length === 0 && (
                            <p className="text-gray-500">No places found near this area.</p>
                        )}
                        {!nearbyLoading && places.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {places.map(place => (
                                    <PlaceCard key={place._id} place={place} onDelete={(id) =>
                                        setPlaces(prev => prev.filter(p => p._id !== id))
                                    } />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}