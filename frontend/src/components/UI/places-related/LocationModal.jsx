import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { X } from "lucide-react";

export const LocationModal = ({ coords, onClose }) => {
  return (
        <div className="fixed inset-0 bg-black/60 z-3000 flex items-center justify-center px-6 py-10 mt-10">
            <div className="relative bg-white w-full max-w-7xl h-[88vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 bg-white border-b z-5000 relative shadow">
                    <h2 className="text-xl font-semibold text-gray-800">Location on Map</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition z-6000">
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
                <div className="flex-1 relative z-100">
                    <MapContainer center={[coords.lat, coords.long]} zoom={15} scrollWheelZoom={true} className="absolute inset-0 w-full h-full z-100">
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[coords.lat, coords.long]}>
                            <Popup>Your Destination</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};
