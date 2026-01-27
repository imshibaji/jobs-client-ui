import { User } from "@/utils/types/User";
import { BASE_URL } from "astro:env/client";
import { useState, useEffect } from "react";

export function ImageUpload({user, token}:{user?:User, token?:string}) {
    const initialImage = user?.image ? `${BASE_URL}/file/view?filename=${user?.image}` : "/logo.jpeg";
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(initialImage);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
        }
    };

    useEffect(() => {
        if (!selectedFile) {
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select an image to upload.");
            return;
        }
        // console.log("Uploading:", selectedFile);

        // Here you would typically handle the file upload, e.g., using FormData and fetch
        const formData = new FormData();
        formData.append('folder', 'pictures');
        formData.append('customName', 'user-'+user?.id+'-profile-picture');
        formData.append('file', selectedFile);
        fetch(BASE_URL+'/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        }).then(response => response.json()).then(async response => {
            if(response.error) {
                alert(response.error);
                return;
            }

            // Upload was successful
            // console.log(response);

            // Update the user image
            const updatedUser = await fetch(BASE_URL + '/auth/change-image', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newImage: response.filename })
            }).then(response => response.json());

            // Update the user object
            // console.log(updatedUser);

            // Update the image preview
            // setPreview(`${BASE_URL}/file/image/view?filename=${response.filename}`);

            // Clear the selected file
            setSelectedFile(null);

            // Show a success message
            alert('Image uploaded successfully!');
        }).catch(error => {
          console.error('Error uploading file:', error);
        });
    }

    return(
        <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-8">
            <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-3">Profile Picture</h2>
                <img className="rounded-2xl aspect-square object-cover w-60 h-60" src={preview} alt="Profile Preview" />
                <input onChange={handleFileChange} type="file" accept="image/*" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <button onClick={handleSubmit} className="w-full bg-primary text-white py-2 rounded-lg hover:bg-violet-800 transition duration-200">
                    Upload
                </button>
            </div>
        </div>
    );
}