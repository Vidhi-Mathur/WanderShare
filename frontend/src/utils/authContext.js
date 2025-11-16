import { createContext } from "react";

export const AuthContext = createContext({
    loading: true,
    login: () => {},
    signup: () => {},
    logout: () => {},
    token: null,
    setToken: () => {},
    details: null
})