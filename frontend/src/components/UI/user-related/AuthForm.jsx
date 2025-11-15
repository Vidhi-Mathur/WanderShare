import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { AuthContext } from "../../../utils/authContext"

export const AuthForm = ({ signupMode }) => {
    const { signup, login, token, setToken } = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const changeHandler = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        setErrors([])
        const form = new FormData(e.target)
        const data = Object.fromEntries(form.entries())
        try {
            let url = signupMode? `${import.meta.env.VITE_SERVER_URL}/user/signup`: `${import.meta.env.VITE_SERVER_URL}/user/login`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token? `Bearer ${token}`: ' ' 
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if(!response.ok){
                const errors = result.errors? result.errors.map(err => err.msg): [result.message];
                throw { errors }
            }
            signupMode? signup(result.token, result.user): login(result.token, result.user)
            setToken(result.token)
            navigate('/')
            return result
        }
        catch(err){
            if(err.errors) setErrors(err.errors);     
            else setErrors([err.message || "Can't authenticate, try again later..."]);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="glass-card rounded-2xl p-8 md:p-10 backdrop-blur-xl border border-white/50 shadow-xl">
                <div className="text-center mb-8">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-green-900 mb-2">
                        {signupMode ? "Create Your Account" : "Sign In"}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {signupMode ? "Start sharing your travel stories today" : "Access your wandering journey"}
                    </p>
                </div>
                {errors && errors.length > 0 && (
                    <div className="mb-5 p-3 rounded-lg bg-destructive text-destructive-foreground text-left">
                        <ul className="list-disc pl-5 space-y-1">
                            {errors.map((e, i) => (
                                <li key={i}>{e}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <form onSubmit={submitHandler} className="space-y-5">
                    {signupMode && (
                        <div>
                          <label htmlFor="name" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">
                                Full Name
                          </label>
                          <input id="name" type="text" name="name" value={formData.name} onChange={changeHandler} placeholder="Alex Johnson" className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 placeholder-gray-400" required={signupMode} />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input id="email" type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 placeholder-gray-400" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                          <input id="password" type="password" name="password" value={formData.password} onChange={changeHandler} placeholder={signupMode ? "Create a strong password" : "Enter your password"} className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-300 placeholder-gray-400" required />
                        </div>
                    </div>
                    {signupMode && (
                        <div className="flex items-start gap-3">
                            <input id="terms" type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mt-1 cursor-pointer" required />
                            <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
                                I agree to the{" "}
                                <button type="button" className="text-primary hover:underline font-semibold">Terms of Service</button>
                                {" "}and{" "}
                                <button type="button" className="text-primary hover:underline font-semibold">Privacy Policy</button>
                            </label>
                        </div>
                    )}
                    <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-linear-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-poppins font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-600/30 mt-6">
                        {loading ? (
                          <div className="flex justify-center items-center gap-2">
                                <Loader2 className="w-6 h-6 animate-spin" />
                                <span>Processing...</span>
                          </div>
                        ) : (
                            signupMode ? "Create Account" : "Sign In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
