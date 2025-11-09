import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext({
    loading: false,
    login: () => {},
    signup: () => {},
    logout: () => {},
    token: null,
    setToken: () => {},
    details: () => {}
})

export const AuthCtxProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [details, setDetails] = useState({ name: "", email: "" })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const savedToken = localStorage.getItem("authToken")
        const savedDetails = localStorage.getItem("userDetails")
        if(savedToken){
            setToken(savedToken)
            if(savedDetails) setDetails(JSON.parse(savedDetails))
        }
        setLoading(false)
    }, [])

    const login = (newToken, name, email) => {
        setToken(newToken)
        setDetails({ name, email })
        localStorage.setItem("authToken", newToken)
        localStorage.setItem("userDetails", JSON.stringify({ name, email }))
    }

    const signup = (newToken, name, email) => {
        setToken(newToken)
        setDetails({ name, email })
        localStorage.setItem("authToken", newToken)
        localStorage.setItem("userDetails", JSON.stringify({ name, email }))
    }

    const logout = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/logout`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                }
            })
            const result = await response.json()
            if(!response.ok){
                throw new Error(result.message)
            }
            setToken(null)
            localStorage.removeItem("authToken")
            localStorage.removeItem("userDetails")
        } 
        catch(err){
            throw new Error(err.message || "Failed to log user out")
        }
    }

    const ctxValue = {
        loading,
        login,
        signup,
        logout,
        token,
        setToken,
        details
    }

  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
}
