import { useState, useEffect } from "react"
import { AuthContext } from "../utils/authContext"

export const AuthCtxProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [details, setDetails] = useState({ id: "", name: "", email: "" })
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

    const login = (newToken, user) => {
    const userDetails = { id: user._id, name: user.name, email: user.email }
    setToken(newToken)
    setDetails(userDetails)
    localStorage.setItem("authToken", newToken)
    localStorage.setItem("userDetails", JSON.stringify(userDetails))
}

const signup = (newToken, user) => {
    const userDetails = { id: user._id, name: user.name, email: user.email }
    setToken(newToken)
    setDetails(userDetails)
    localStorage.setItem("authToken", newToken)
    localStorage.setItem("userDetails", JSON.stringify(userDetails))
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
