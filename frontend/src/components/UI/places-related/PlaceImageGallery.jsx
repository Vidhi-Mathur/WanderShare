import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const PlaceImageGallery = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const previousHandler = () => {
        setCurrentImageIndex(prev => (
            prev === 0? images.length - 1 : prev - 1
        ))
    }

    const nextHandler = () => {
        setCurrentImageIndex(prev => (
            prev === images.length - 1? 0: prev + 1
        ))
    }

    return (
        <div className="w-full">
            <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden glass-card">
                <img src={images[currentImageIndex] || "/placeholder.svg"} alt={`Image ${currentImageIndex + 1}`} className="w-full h-full object-cover"/>
                {images.length > 1 && (
                    <>
                    <button onClick={previousHandler} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                        <ChevronLeft size={24} className="text-gray-900" />
                    </button>
                    <button onClick={nextHandler} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                        <ChevronRight size={24} className="text-gray-900" />
                    </button>
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-poppins">
                        {currentImageIndex + 1} / {images.length}
                    </div>
                    </>
                )}
            </div>
            {images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button key={index} onClick={() => setCurrentImageIndex(index)} className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentImageIndex? "border-primary": "border-transparent hover:border-primary/50" }`}>
                            <img src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
