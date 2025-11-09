import { ArrowRight, Lock } from "lucide-react"
import { Link } from "react-router-dom"

export const AccessDeniedPage = () => {
    return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden flex items-center justify-center px-4">
        <div className="relative z-10 max-w-2xl w-full">
            <div className="glass-card rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-white/50 shadow-2xl text-center space-y-6">
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-red-100 to-rose-100 flex items-center justify-center">
                        <Lock className="w-10 h-10 text-red-600" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold bg-linear-to-r from-green-900 to-teal-900 bg-clip-text text-transparent">
                        Access Denied
                    </h1>
                    <p className="text-lg text-gray-600 font-dm-sans">This page requires authentication</p>
                </div>
                <div className="space-y-3 py-4">
                    <ul className="space-y-2 text-sm text-gray-600 font-dm-sans">
                        {["Upload and organize your travel photos", "Rate and review places from around the world", "Connect with fellow travelers and explorers"].map((text, idx) => (
                            <li key={idx} className="flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                                {text}
                            </li>
                        ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link to="/auth" className="px-8 py-4 bg-linear-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-poppins font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30 hover:scale-105 inline-flex items-center justify-center gap-2 group">
                        Sign In
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/" className="px-8 py-4 border-2 border-green-200 hover:border-green-400 hover:bg-green-50/50 text-green-900 font-poppins font-semibold rounded-xl transition-all duration-300">
                        Back to Home
                    </Link>
                </div>
                <div className="pt-4 border-t border-white/30">
                    <p className="text-xs text-gray-500 font-dm-sans">
                        Don't have an account?{" "}
                        <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
                            Create one now
                        </Link>
                    </p>
                </div>
            </div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br from-green-200/10 to-teal-200/10 rounded-full blur-3xl pointer-events-none hidden md:block"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-linear-to-tr from-teal-200/10 to-green-200/10 rounded-full blur-3xl pointer-events-none hidden md:block"></div>
        </div>
    </main>
  )
}
