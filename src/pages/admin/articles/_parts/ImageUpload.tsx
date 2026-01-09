import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useCallback, useEffect, useState } from "react";

export default function ImageUpload({token, fileName, onSubmitSuccess}: {token: string, fileName?: string, onSubmitSuccess?: (data: any) => void | Promise<void>}) {
    const {upload, get} = useHttpClient(token);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // FIX 1: Use useCallback to memoize the function and ensure it's not redefined constantly.
        // This function runs only if fileName is present AND we haven't set a preview yet.
        const imageLoaded = useCallback(() => {
            if (fileName && imagePreview === null) {
                // Set the image preview URL using the BASE_URL and file name
                const fullUrl = BASE_URL + `/file/view?folder=pictures&filename=${fileName}`;
                setImagePreview(fullUrl);                
            }
        }, [fileName, imagePreview]); // Dependency array ensures it only runs if these values change
    
        // FIX 2: Correctly call the function inside useEffect.
        // We only need to run this on mount and when fileName changes.
        useEffect(() => {
            imageLoaded();
        }, [imageLoaded]); // Depend on the memoized imageLoaded function
    
        const handleDelete = async () => {
            if (fileName) {
                await get(BASE_URL + `/file/delete?folder=pictures&filename=${fileName}`);
                setImageFile(null);
            }
        };
    
        // 🔄 Handlers
        const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            console.log('File selected:', file?.name);
            
            if (file) {
                setImageFile(file); // Store the file object for submission
                
                // Generate and set preview URL
                const reader = new FileReader();
                reader.onload = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        };
    
        const handleImageUpload = async () => {
            if (!imageFile) {
                alert('Please select an image file first.');
                return;
            }
            await handleDelete();
            setIsUploading(true);
            try {
                // 1. Sanitize file name
                const baseFileName = imageFile.name.split('.')[0];
                const sanitizedName = baseFileName.replace(/[^a-zA-Z0-9]/g, '-');
                const customFileName = 'article-' + sanitizedName + '-' + Date.now(); // Ensure uniqueness
                
                // 2. Prepare FormData
                const formData = new FormData();
                formData.append('folder', 'pictures');
                formData.append('customName', customFileName);
                formData.append('file', imageFile);
    
                // 3. API Call
                const response = await upload(BASE_URL + `/upload/`, formData);
    
                if (response.ok) {
                    const result = await response.json();
                    console.log('Image uploaded successfully', result);
                    onSubmitSuccess && onSubmitSuccess(result);
                    alert('Image uploaded successfully!');
                } else {
                    // If the response is not ok, read the error message from the body
                    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                    console.error('Failed to upload image:', errorData);
                    alert(`Failed to upload image: ${errorData.message || response.status}`);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Error uploading image');
            } finally {
                setIsUploading(false);
            }
        };

    return (
        <div className="space-y-0">
            <div id="image-preview-container" className="h-46 w-full bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                    <img src={imagePreview!} id="image-preview" className={(imagePreview ? '' : 'hidden ')+ "w-full h-full object-cover"} alt="Image Preview" />
                    <span id="preview-text" className={(imagePreview ? 'hidden' : '') + "absolute top-1/2 text-center transform text-gray-400 text-sm w-full"}>Select an image to preview</span>
                    <input onChange={handleImageChange} type="file" id="image" accept="image/*" className="w-full h-full absolute top-0 left-0 opacity-0" />
                </div>
            </div>
            <div>
                <button className="w-full mt-2 text-white bg-violet-500 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleImageUpload} disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    )
}