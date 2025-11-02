import { AddPlaceForm } from "../UI/places-related/AddPlaceForm"

export const AddPlacePage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-teal-50 py-12 px-4">
        <div className="relative z-10">
            <div className="text-center mb-12">
                <h1 className="font-playfair text-5xl md:text-6xl font-bold text-green-900 mb-4">Share Your Discovery</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Add a new destination to WanderShare and inspire fellow travelers with your favorite places and experiences.
                </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <AddPlaceForm />
            </div>
        </div>
    </main>
  )
}
