import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";

export function ProfileImageUpload({token, applicantId, fileName, onSubmitSuccess }: {token: string, applicantId?: string, fileName?: string, onSubmitSuccess?: (data: any) => void | Promise<void>}) {
    const {upload} = useHttpClient(token);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        imageLoaded();
    }, [fileName]);

    const imageLoaded = async ()=>{
        if (fileName && imagePreview === null) {
            // Set the image preview URL
            setImagePreview(BASE_URL + `/file/view?folder=pictures&filename=${fileName}`);
        }
    }

    // 🔄 Handlers
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!applicantId) {
            alert('Applicant ID not found!');
            return;
        }else{
            const file = event.target.files?.[0];
            if (file) {
                setImageFile(file); // Store the file object for submission
                const reader = new FileReader();
                reader.onload = () => {
                    setImagePreview(reader.result as string); // Set preview URL
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleImageUpload = async () => {
        try {
            if (imageFile && applicantId) {
                const formData = new FormData();
                formData.append('folder', 'pictures');
                formData.append('customName', 'applicant-'+(applicantId || Date.now())+'-profile-picture');
                formData.append('file', imageFile);
                const response = await upload(BASE_URL + `/upload/`, formData);

                if (response.ok) {
                    console.log('Image uploaded successfully');
                    onSubmitSuccess && onSubmitSuccess(await response.json());
                    alert('Image uploaded successfully!');
                } else {
                    console.error('Failed to upload image');
                    alert('Failed to upload image');
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        }
    }

    return (
        <>
            {/* **1. Profile Picture Card** */}
            {/* <div className="md:col-span-1 bg-violet-50 rounded-xl p-6 shadow-inner flex flex-col items-center justify-center relative"> */}
                <h3 className="text-xl font-bold text-violet-800 mb-5 text-center">Profile Photo</h3>
                
                <label htmlFor="image" className="relative block cursor-pointer group">
                    <img className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-violet-600 ring-2 ring-violet-200 transition-transform duration-200 group-hover:scale-105" 
                        src={imagePreview || '/logo-pink.jpg'} 
                        alt="Profile Picture" />
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                        </svg>
                    </div>

                    <input type="file" onChange={handleImageChange} id="image" className="hidden" accept="image/*" />
                </label>
                <p className="text-sm text-gray-600 mt-4 text-center">Click the photo to change/upload.</p>
                <button type="button" onClick={handleImageUpload} disabled={!imageFile}
                    className="w-full bg-violet-600 text-white font-semibold py-3 rounded-xl hover:bg-violet-700 transition duration-200 shadow-xl shadow-violet-200/50 focus:outline-none focus:ring-4 focus:ring-violet-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:shadow-none">
                    {"Upload Image"}
                </button>
            {/* </div> */}
        </>
    )
}