export const AuthHeroSection = () => {
  return (
        <div className="hidden lg:flex flex-col justify-center items-center lg:items-start gap-8">
            <div className="max-w-lg">
                <h1 className="font-playfair text-5xl md:text-6xl font-bold bg-linear-to-r from-green-900 via-teal-700 to-green-600 bg-clip-text text-transparent mb-6">
                    Welcome Back, Traveler
                </h1>
                <p className="font-dm-sans text-lg text-gray-700 leading-relaxed">
                    Join millions exploring the world. Share your adventures, discover hidden gems, and connect with fellow wanderers across the globe.
                </p>
            </div>
            <div className="w-full max-w-lg space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-sm font-dm-sans text-gray-700">Share stunning travel photos with locations</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                  <span className="text-sm font-dm-sans text-gray-700">Rate and review places you've visited</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-sm font-dm-sans text-gray-700">Connect with travelers and explore together</span>
                </div>
            </div>
        </div>
    )
}
