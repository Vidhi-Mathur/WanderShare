import { useState, useContext } from "react"
import { ChevronDown, User, LogOut } from "lucide-react"
import { AuthContext } from "../../../store/Auth-Context"
import { Link } from "react-router-dom"

export const DropDownMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { logout, details } = useContext(AuthContext)

    const logoutHandler = async () => {
        logout()
        setDropdownOpen(false)
    }

    return (
        <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-foreground font-poppins">Hi, {details.name}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-accent transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border/50 rounded-xl shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 z-50" onClick={() => setDropdownOpen(false)}>
                    <div className="p-3 border-b border-border/30">
                        <p className="text-xs text-muted-foreground font-poppins">Account</p>
                    </div>
                    <div className="p-2 space-y-1">
                        <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-primary/10 transition-all duration-300 font-poppins font-medium group">
                            <User className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                            Profile
                        </Link>
                    </div>
                    <div className="p-2 border-t border-border/30">
                      <button onClick={logoutHandler} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-all duration-300 font-poppins font-medium group">
                          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Logout
                      </button>
                    </div>
                </div>
            )}
        </div>
    )
}
