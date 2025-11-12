import { useContext, useState } from "react"
import { Upload, MapPin, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { LocationPicker } from "./LocationPicker"
import { uploadImageHandler } from "../../../services/ImageService"
import { AuthContext } from "../../../utils/authContext"

const requirementConstants = [
    "Clear, descriptive name that identifies the location",
    "Detailed description with travel tips and experiences",
    "High-quality photos that showcase the place",
    "Accurate GPS coordinates for the location"
]

export const AddPlaceForm = () => {
    const { token } = useContext(AuthContext)
    console.log(token)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        images: [],
        location: { address: "", latitude: null, longitude: null }
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [showLocationPicker, setShowLocationPicker] = useState(false)

    const imageUploadHandler = (e) => {
        const files = Array.from(e.target.files || [])
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...files].slice(0, 6)
        }))
    }

    const removeImageHandler = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    const locationSelectHandler = (location) => {
        setFormData((prev) => ({
            ...prev,
            location: {
                address: location.address,
                latitude: location.lat,
                longitude: location.lng
            }
        }))
        setShowLocationPicker(false)
    }

    const changeHandler = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            const imageUrls = await uploadImageHandler(formData.images, "wandershare_places", token)
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/place`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
                body: JSON.stringify({
                    ...formData,
                    images: imageUrls,
                })
            })
            const result = await response.json()
            if (!response.ok){
                throw new Error(result.message)
            }
            setSuccess(true)
            setFormData({
                name: "",
                description: "",
                images: [],
                location: { address: "", latitude: null, longitude: null }
            })
        } 
        catch(err){
            setError(err.message || "Failed to add place, try again later.")
        } 
        finally{
            setLoading(false)
        }
    }

    if(success) {
        return (
            <div className="glass-card rounded-2xl p-12 text-center backdrop-blur-xl border border-white/50 shadow-xl">
                <div className="flex justify-center mb-4">
                    <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                </div>
                <h2 className="font-playfair text-3xl font-bold text-green-900 mb-2">
                    Place Added Successfully!
                </h2>
                <p className="text-gray-600">
                    Your destination will be reviewed and appear on WanderShare shortly.
                </p>
                <button onClick={() => setSuccess(false)} className="mt-6 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-poppins font-medium transition-all">
                    Add Another
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={submitHandler} className="space-y-8 relative">
            {error && (
                <div className="p-4 rounded-lg bg-destructive text-destructive-foreground flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}
            <div className="glass-card rounded-xl p-6 backdrop-blur-xl border border-white/50">
                <h3 className="font-poppins font-bold text-green-900 mb-3">What We're Looking For</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    {requirementConstants.map((req, idx) => (
                        <li className="flex items-start gap-3" key={idx}>
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="glass-card rounded-2xl p-8 md:p-10 backdrop-blur-xl border border-white/50 shadow-xl">
                <div className="space-y-3 mb-8">
                    <label htmlFor="name" className="block text-sm font-poppins font-semibold text-green-900">
                        Place Name *
                    </label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={changeHandler} placeholder="e.g., Bali Rice Terraces" className="w-full px-4 py-3 rounded-lg bg-white/60 border border-emerald-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-300 placeholder-gray-400 text-gray-800" required />
                </div>
                <div className="space-y-3 mb-8">
                    <label htmlFor="description" className="block text-sm font-poppins font-semibold text-green-900">
                        Description *
                    </label>
                    <textarea id="description" name="description" value={formData.description} onChange={changeHandler} placeholder="Share details about this place, what makes it special..." className="w-full px-4 py-3 rounded-lg bg-white/60 border border-emerald-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-300 placeholder-gray-400 text-gray-800 min-h-32 resize-none" required />
                </div>
                <div className="space-y-3 mb-8">
                    <label className="block text-sm font-poppins font-semibold text-green-900">
                        Images ({formData.images.length}/6) *
                    </label>
                    {formData.images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                            {formData.images.map((preview, index) => (
                                <div key={index} className="relative group rounded-lg overflow-hidden">
                                    <img src={URL.createObjectURL(preview)} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                                    <button type="button" onClick={() => removeImageHandler(index)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" >
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <label className="block">
                        <div className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition-all duration-300">
                            <Upload className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                            <p className="font-poppins font-semibold text-gray-700 mb-1">Upload Photos</p>
                            <p className="text-sm text-gray-500">Drag & drop or click to select (up to 6 images)</p>
                        </div>
                        <input type="file" multiple accept="image/*" onChange={imageUploadHandler} className="hidden" />
                    </label>
                </div>
                <div className="space-y-3 mb-8">
                    <label className="block text-sm font-poppins font-semibold text-green-900">Location *</label>
                    {formData.location.address && formData.location.latitude && formData.location.longitude ? (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start justify-between">
                            <div>
                                <p className="font-poppins font-semibold text-green-900">{formData.location.address}</p>
                                <p className="text-sm text-gray-600">
                                    {formData.location.latitude.toFixed(4)}, {formData.location.longitude.toFixed(4)}
                                </p>
                            </div>
                            <button type="button" onClick={() => setShowLocationPicker(true)} className="text-emerald-600 hover:text-emerald-700 font-poppins font-semibold text-sm">
                                Change
                            </button>
                        </div>
                    ) : (
                        <button type="button" onClick={() => setShowLocationPicker(true)} className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all duration-300 flex items-center justify-center gap-2 text-emerald-700 font-poppins font-semibold" >
                            <MapPin className="w-5 h-5" />
                            Select Location on Map
                        </button>
                    )}
                </div>
                {showLocationPicker && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                                <h3 className="font-playfair text-2xl font-bold text-green-900">Select Location</h3>
                                <button type="button" onClick={() => setShowLocationPicker(false)} className="text-gray-500 hover:text-gray-700">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6">
                                <LocationPicker onLocationSelect={locationSelectHandler} />
                            </div>
                        </div>
                    </div>
                )}
                <button type="submit" disabled={loading ||!formData.name ||!formData.description ||formData.images.length === 0 ||!formData.location.latitude ||!formData.location.longitude ||!formData.location.address} className="w-full py-4 px-6 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-poppins font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2">
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Publishing Place...
                        </>
                    ) : (
                        "Publish Place"
                    )}
                </button>
            </div>
        </form>
    )
}