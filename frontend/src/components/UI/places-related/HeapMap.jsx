import "leaflet.heat";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Loader2, TriangleAlert } from "lucide-react";

export const HeatMap = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const mapRef = useRef(null)
    const containerRef = useRef(null)
    useEffect(() => {
        const initMap = async () => {
            try {
                const response = await fetch("http://localhost:3000/place/heatmap")
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
            }
            catch(err){
                setError(err.message || "Failed to load heatmap")
            }
            finally{
                setLoading(false)
            }
        }
        initMap()
        return () => {
            if(mapRef.current){
                mapRef.current.remove()
            }
        }
    }, [])
  
    return (
        <>
            {loading && (
                <main className="min-h-screen flex items-center justify-center">
                  <Loader2 className="w-10 h-10 animate-spin text-emerald-600"/>
                </main>
            )}
            {!loading && error && (
                <main className="min-h-screen flex flex-col items-center justify-center gap-3">
                    <TriangleAlert className="w-16 h-16 text-red-600"/>
                    <div className="bg-red-600 text-white px-6 py-3 rounded-lg">
                        {error}
                    </div>
                </main>
            )}
            {!loading && !error && (
                <div ref={containerRef} style={{ height:"70vh", width:"100%", borderRadius:"12px" }} />
            )}
        </>
    )
}   