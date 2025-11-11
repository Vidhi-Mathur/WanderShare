export const toggleLikePlace = async (placeId, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/place/${placeId}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await response.json()
        if(!response.ok) {
            throw new Error(result.message)
        }
        return result;
    } 
    catch(err) {
        throw new Error(err.message || "Failed to like/ unlike post")
    }
};
