import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"

const sortMenu = [
    { value: "newest", label: "Newest to Oldest", icon: "↓" },
    { value: "oldest", label: "Oldest to Newest", icon: "↑" },
    { value: "ratingHigh", label: "Rating: High to Low", icon: "⭐" },
    { value: "ratingLow", label: "Rating: Low to High", icon: "✦" },
    { value: "likesMost", label: "Most Liked", icon: "❤️" },
    { value: "likesLeast", label: "Least Liked", icon: "🤍" },
]

const dateMenu = [
    { value: "all", label: "All Time", icon: "🌍" },
    { value: "today", label: "Added Today", icon: "📅" },
    { value: "thisMonth", label: "This Month", icon: "📆" },
    { value: "thisYear", label: "This Year", icon: "📊" },
    { value: "beforeThat", label: "Before This Year", icon: "📜" },
]

const ratingMenu = [
    { value: "all", label: "All Ratings", icon: "⭐" },
    { value: "4", label: "4+ Stars", icon: "⭐⭐⭐⭐" },
    { value: "3", label: "3+ Stars", icon: "⭐⭐⭐" },
    { value: "2", label: "2+ Stars", icon: "⭐⭐" },
]

export const SearchFilterBar = ({ filters, setFilters }) => {
    const [menus, setMenus] = useState({
        sort: false,
        date: false,
        rating: false,
    })

    const filterChangeHandler = (key, value) => {
        setFilters(prev => ({ 
            ...prev, [key]: 
            value 
        }))
        if(key === "sortBy"){
            setMenus(prev => ({ 
                ...prev, 
                sort: false 
            }))
        }
        if(key === "filterDate"){
            setMenus(prev => ({ 
                ...prev, 
                date: false 
            }))
        }
        if(key === "filterRating"){
            setMenus(prev => ({ 
                ...prev, 
                rating: false 
            }))
        }
    }

    const searchChangeHandler = (e) => {
        filterChangeHandler("search", e.target.value)
    }

    const menuToggler = (menu) => {
        setMenus(prev => ({ 
            ...prev, 
            [menu]: !prev[menu] 
        }))
    }

    const getSortLabel = () => {
        const labels = {
            newest: "Newest to Oldest",
            oldest: "Oldest to Newest",
            ratingHigh: "Rating: High to Low",
            ratingLow: "Rating: Low to High",
            likesMost: "Most Liked",
            likesLeast: "Least Liked",
        }
        return labels[filters.sortBy] || "Sort by"
    }

    const getDateLabel = () => {
        const labels = {
            all: "All Time",
            today: "Added Today",
            thisMonth: "This Month",
            thisYear: "This Year",
            beforeThat: "Before This Year",
        }
        return labels[filters.filterDate] || "Date"
    }

    const getRatingLabel = () => {
        const labels = {
            all: "All Ratings",
            "4": "4+ Stars",
            "3": "3+ Stars",
            "2": "2+ Stars",
        }
        return labels[filters.filterRating] || "Rating"
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" placeholder="Search places by name or description..." value={filters.searchQuery} onChange={searchChangeHandler} className="w-full pl-12 pr-4 py-3.5 bg-linear-to-br from-white to-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-200 text-gray-900 placeholder-gray-500" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                <div className="relative">
                    <button onClick={() => menuToggler("sort")} className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
                        <span className="truncate">{getSortLabel()}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${menus.sort ? "rotate-180" : ""}`} />
                    </button>
                    {menus.sort && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-2xl z-10 overflow-hidden backdrop-blur-sm bg-opacity-95 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-1 space-y-1">
                                {sortMenu.map(option => (
                                    <button key={option.value} onClick={() => filterChangeHandler("sortBy", option.value)} className={`w-full text-left px-4 py-2.5 rounded-md flex items-center gap-2 text-sm transition-all duration-150 ${filters.sortBy === option.value? "bg-blue-100 text-blue-700 font-semibold": "text-gray-700 hover:bg-gray-100"}`}>
                                        <span>{option.icon}</span>
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button onClick={() => menuToggler("date")} className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-br from-emerald-500 to-emerald-600 text-white rounded-lg font-medium text-sm hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
                        <span className="truncate">{getDateLabel()}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${menus.date ? "rotate-180" : ""}`} />
                    </button>
                    {menus.date && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-2xl z-10 overflow-hidden backdrop-blur-sm bg-opacity-95 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-1 space-y-1">
                                {dateMenu.map((option) => (
                                    <button key={option.value} onClick={() => filterChangeHandler("filterDate", option.value)} className={`w-full text-left px-4 py-2.5 rounded-md flex items-center gap-2 text-sm transition-all duration-150 ${ filters.filterDate === option.value? "bg-emerald-100 text-emerald-700 font-semibold": "text-gray-700 hover:bg-gray-100" }`}>
                                      <span>{option.icon}</span>
                                      {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button onClick={() => menuToggler("rating")} className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-br from-amber-500 to-amber-600 text-white rounded-lg font-medium text-sm hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
                        <span className="truncate">{getRatingLabel()}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${menus.rating ? "rotate-180" : ""}`} />
                    </button>
                    {menus.rating && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-2xl z-10 overflow-hidden backdrop-blur-sm bg-opacity-95 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-1 space-y-1">
                                {ratingMenu.map((option) => (
                                    <button key={option.value} onClick={() => filterChangeHandler("filterRating", option.value)} className={`w-full text-left px-4 py-2.5 rounded-md flex items-center gap-2 text-sm transition-all duration-150 ${filters.filterRating === option.value? "bg-amber-100 text-amber-700 font-semibold": "text-gray-700 hover:bg-gray-100" }`}>
                                        <span>{option.icon}</span>
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
