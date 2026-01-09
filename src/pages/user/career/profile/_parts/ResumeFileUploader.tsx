import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";

export function ResumeFileUploader({token, applicantId, fileName, onSubmitSuccess}: { token: string, applicantId?: string, fileName?: string, onSubmitSuccess?: (data: any) => void | Promise<void> }) {
    const {upload, download} = useHttpClient(token);
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    // File Loaded
    useEffect(() => {
        if (fileName && resumeFile === null) {
            // Set the resume preview URL
            downloadFile();
        }
    }, [fileName]);

    const downloadFile = async () => {
        try {
            const response = await download(BASE_URL + `/file/download?Folder=resumes&Filename=${fileName}`);
            setResumeFile(new File([await response.blob()], fileName!, { type: response.headers.get('content-type') || 'application/octet-stream' }));
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!applicantId) {
            alert('Applicant ID not found!');
            return;
        }else{
            const file = event.target.files?.[0];
            if (file) {
                setResumeFile(file); // Store the resume file object for submission
            }
        }
    };

    const handleDelete = async () => {
        if (fileName) {
            await download(BASE_URL + `/file/delete?folder=resumes&filename=${fileName}`);
            setResumeFile(null);
        }
    };

    const handleFileUpload = async () => {
        if (resumeFile) {
            await handleDelete();

            const formData = new FormData();
            formData.append('folder', 'resumes');
            formData.append('customName', 'applicant-'+(applicantId || Date.now())+'-resume');
            formData.append('file', resumeFile);

            try {
                const response = await upload(BASE_URL + `/upload/`, formData);

                if (response.ok) {
                    console.log('Resume uploaded successfully');
                    onSubmitSuccess && onSubmitSuccess(await response.json());
                    alert('Resume uploaded successfully!');
                } else {
                    console.error('Failed to upload resume');
                    alert('Failed to upload resume');
                }
            } catch (error) {
                console.error('Error uploading resume:', error);
                alert('Error uploading resume');
            }
        }
    }

    return (
        <div>
            {/* File Input: Resume */}
            <div className="mt-6">
                <label htmlFor="resume_file" className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (.doc, .pdf) {resumeFile && ` - ${resumeFile.name}`}</label>
                <div className="flex items-center justify-between">
                    <input onChange={handleFileChange} type="file" id="resume_file" accept=".doc, .pdf"
                        className="w-full sm:w-3/4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-200 border border-gray-300 rounded-bl-lg rounded-tl-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition duration-150" />
                    <button type="button" onClick={handleFileUpload} disabled={!resumeFile}
                        className="w-full sm:w-1/4 bg-violet-600 text-white font-semibold py-3 rounded-br-lg rounded-tr-lg hover:bg-violet-700 transition duration-200 shadow-xl shadow-violet-200/50 focus:outline-none focus:ring-4 focus:ring-violet-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:shadow-none">
                        {"Upload"}
                    </button>
                </div>
                {/* Display filename of currently selected resume if editing */}
                { resumeFile?.name && (
                    <p className="text-xs text-gray-500 mt-1">Current Resume: **{resumeFile && <a className="text-violet-600 font-bold hover:underline" href={URL.createObjectURL(resumeFile)} target="_blank" download={resumeFile.name}>{resumeFile.name}</a> || "No Resume Selected"}**</p>
                )}
            </div>
        </div>
    );
}