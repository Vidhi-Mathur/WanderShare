import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Search } from "lucide-react";

export const LocationPicker = ({ onLocationSelect }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const provider = new OpenStreetMapProvider();

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if(query.length < 3) return setSuggestions([]);
        const results = await provider.search({ query });
        setSuggestions(results.slice(0, 5))
    };

    const locationClickHandler = (location) => {
        setSelectedLocation({
            address: location.label,
            lat: location.y,
            lng: location.x,
        })
        setSearchQuery(location.label)
        setSuggestions([])
    };

    const confirmHandler = () => {
        if(selectedLocation) onLocationSelect(selectedLocation);
    };

    return (
        <div className="space-y-4">
            <div className="relative z-2000">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder="Search location..." className="w-full pl-12 pr-4 py-3 rounded-lg border border-emerald-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all" />
                {suggestions.length > 0 && (
                    <ul className="absolute z-50 bg-white border border-emerald-200 rounded-lg shadow-lg mt-2 w-full max-h-48 overflow-auto">
                        {suggestions.map((loc, idx) => (
                            <li key={idx} onClick={() => locationClickHandler(loc)} className="px-4 py-2 cursor-pointer hover:bg-emerald-50 text-gray-700">
                                {loc.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="rounded-lg overflow-hidden border border-emerald-200">
                <MapContainer center={selectedLocation? [selectedLocation.lat, selectedLocation.lng]: [20.5937, 78.9629]} zoom={selectedLocation? 10: 5} style={{ height: "400px", width: "100%" }} >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {selectedLocation && <Marker position={[selectedLocation.lat, selectedLocation.lng]} />}
                </MapContainer>
            </div>
            <button type="button" onClick={confirmHandler} disabled={!selectedLocation} className="w-full py-3 px-4 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-poppins font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Confirm Location
            </button>
        </div>
    );
};