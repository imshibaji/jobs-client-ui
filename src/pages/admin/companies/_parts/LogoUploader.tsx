import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState, useCallback } from "react";

export default function LogoUploader({token, fileName, onSubmitSuccess }: {token: string, fileName?: string, onSubmitSuccess?: (data: any) => void | Promise<void>}) {
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
            const customFileName = 'company-' + sanitizedName + '-' + Date.now(); // Ensure uniqueness
            
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
        <div>
            <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Company Logo</h3>
                
                <label htmlFor="logo" className="relative block cursor-pointer group">
                    <img id="logo-preview" className="w-24 h-24 object-cover rounded-full border-4 border-violet-300 ring-4 ring-violet-50 ring-offset-2 transition-transform duration-200 group-hover:scale-105" 
                        src={imagePreview || '/logo-pink.jpg'} 
                        alt="Company Logo Preview"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-6 h-6 text-gray-100 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    
                    <input type="file" onChange={handleImageChange} id="logo" name="logo" className="hidden" accept="image/*" />
                </label>

                <p className="text-xs text-gray-500 mt-3 text-center">Click the logo to upload</p>
                <button 
                    onClick={handleImageUpload} 
                    disabled={isUploading || !imageFile}
                    className="mt-4 bg-violet-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-violet-700 transition duration-200 shadow-md disabled:bg-gray-400">
                    {isUploading ? "Uploading..." : "Upload Logo"}
                </button>
            </div>
        </div>
    );
}