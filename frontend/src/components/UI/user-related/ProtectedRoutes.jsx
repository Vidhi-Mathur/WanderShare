import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AuthContext } from "../../../utils/authContext";

export const ProtectedRoutes = () => {
    const { token, loading } = useContext(AuthContext)
    if(loading){
        return <Loader2 className="w-12 h-12 animate-spin" />
    } 
    if (!token) {
        return <Navigate to="/access-denied" replace />;
    }
    return <Outlet />
}