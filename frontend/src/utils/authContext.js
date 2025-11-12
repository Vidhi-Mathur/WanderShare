import { createContext } from "react";

export const AuthContext = createContext({
    loading: false,
    login: () => {},
    signup: () => {},
    logout: () => {},
    token: null,
    setToken: () => {},
    details: () => {}
})