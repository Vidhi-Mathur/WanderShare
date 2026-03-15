export const deletePlaceHandler = async(placeId, token) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/place/${placeId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const result = await response.json();
    if(!response.ok){
        throw new Error(result.message || "Failed to delete place");
    }
    return result;
};