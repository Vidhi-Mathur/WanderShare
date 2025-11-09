import { useState } from "react";
import { AuthHeroSection } from "../UI/user-related/AuthHeroSection"
import { AuthForm } from "../UI/user-related/AuthForm"

export const AuthPage = () => {
    const [signup, setSignup] = useState(false);

    return (
        <main className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl items-center gap-12">
            <div className="hidden lg:flex justify-center items-center">
                <AuthHeroSection />
            </div>
            <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto lg:items-start">
                <AuthForm signupMode={signup} />
                <div className="w-full mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {signup ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button onClick={() => setSignup(!signup)} className="text-green-700 font-semibold hover:text-green-900 transition-colors duration-300">
                            {signup ? "Sign In" : "Sign Up"}
                        </button>
                    </p>
                </div>
          </div>
        </div>
      </div>
    </main>
  );
}
