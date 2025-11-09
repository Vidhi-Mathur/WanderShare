export const uploadImageHandler = async (files, folder, token) => {
    try {
        const imageFormData = new FormData();
        imageFormData.append('folder', folder);
        for (let i = 0; i < files.length; i++){
            imageFormData.append('images', files[i]);
        }
        const imageResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/upload-image`, {
            method: 'POST',
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: imageFormData,
        });
        const imageResult = await imageResponse.json();
        if(!imageResponse.ok){
            throw new Error(imageResult.message);
        }
        return imageResult.imageUrls;
    } 
    catch(err){
        throw new Error(err.message || 'Image upload failed');
    }
};
