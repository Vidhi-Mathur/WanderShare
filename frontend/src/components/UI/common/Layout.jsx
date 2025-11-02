import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
    return (
        <div className="font-dmSans antialiased bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 relative">
            <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-green-200/20 to-emerald-200/10 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-linear-to-br from-teal-200/20 to-green-200/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-linear-to-br from-emerald-200/20 to-teal-200/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}