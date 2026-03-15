export const deletePlaceHandler = async(placeId, token) => {
    const response = await fetch(`http://localhost:3000/place/${placeId}`, {
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