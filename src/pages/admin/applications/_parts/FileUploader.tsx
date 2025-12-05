import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useState } from "react";

interface FileUploaderProps {
    token: string;
    onSubmitSuccess?: (data: any) => void | Promise<void>;
    [key: string]: any; // Allow any additional props
}


export default function FileUploader({token, onSubmitSuccess, ...props}: FileUploaderProps) {
    const {upload, get } = useHttpClient(token);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        const file = event.target.files?.[0];
        console.log('File selected:', file?.name);
        
        if (file) {
            setFile(file); // Store the file object for submission
        }
    };

    const handleDelete = async () => {
        if (props.fileName) {
            await get(BASE_URL + `/file/delete?folder=resumes&filename=${props.fileName}`);
            setFile(null);
        }
    };

    const handleSubmit = async () => {
        await handleDelete();
        setIsUploading(true);
        try {
            // 1. Sanitize file name
            const baseFileName = file!.name.split('.')[0];
            const sanitizedName = baseFileName.replace(/[^a-zA-Z0-9]/g, '-');
            const customFileName = props.customName || 'applicant-' + sanitizedName + '-' + Date.now(); // Ensure uniqueness
            
            // 2. Prepare FormData
            const formData = new FormData();
            formData.append('folder', props.folder || 'resumes');
            formData.append('customName', customFileName);
            formData.append('file', file!);

            // 3. API Call
            const response = await upload(BASE_URL + `/upload/`, formData);

            if (response.ok) {
                const result = await response.json();
                console.log('Resume uploaded successfully', result);
                onSubmitSuccess && onSubmitSuccess(result);
                alert('Resume uploaded successfully!');
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

    if (isUploading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex flex-row">
                <input onChange={handleImageChange} type="file" id="file" name="file" accept={props.accept || ".doc, .pdf"} className={ props.className || "input-file w-full border border-gray-300 p-3 rounded-lg focus:ring-violet-500 focus:border-violet-500 block shadow-sm"} disabled={props.disabled} required={props.required} />
                <button type="button" onClick={handleSubmit} id="submit" className={props.buttonClassName || file ? "btn btn-primary ml-4" : "btn btn-disabled ml-4"} disabled={!file}>Upload</button>
            </div>
        </div>
    );
}