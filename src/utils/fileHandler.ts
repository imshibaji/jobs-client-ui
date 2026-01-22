import { BASE_URL } from "astro:env/client";
import { useHttpClient } from "./useHttpClient";

export async function fileUpload(token: string, file: any, folder?: string, customName?: string) {
    console.log(file);
    
    const {upload} = useHttpClient(token);
    const formData = new FormData();
    if(customName) formData.append('customName', customName);
    if(folder) formData.append('folder', folder);
    formData.append('file', file[0]);
    console.log(formData);
    
    const response = await upload(BASE_URL+'/upload', formData);
    console.log(response);
    
    if(!response.ok) {
        alert('File upload failed!');
    }
    const fileData = await response.json();
    return fileData.filename;
}

export async function fileDelete(token: string, folder: string, fileName: string) {
    const {get} = useHttpClient(token);
    await get(BASE_URL + `/file/delete?folder=${folder}&filename=${fileName}`);
}

// File Download
export async function fileDownload(token: string, folder: string, fileName: string) {
    const {get} = useHttpClient(token);
    await get(BASE_URL + `/file/download?Folder=${folder}&Filename=${fileName}&OutputFileName=${fileName}`);
}

// File Download Link
export function fileDownloadLink(folder: string, fileName: string) {
    return BASE_URL + `/file/download?Folder=${folder}&Filename=${fileName}&OutputFileName=${fileName}`;
}

// File View
export async function fileView(token: string, folder: string, fileName: string) {
    const {get} = useHttpClient(token);
    return await get(BASE_URL + `/file/view?folder=${folder}&filename=${fileName}`);
}

// File View Link
export async function fileViewLink(folder: string, fileName: string) {
    return BASE_URL + `/file/view?folder=${folder}&filename=${fileName}`;
}

// File List
export async function fileList(token: string, folder: string) {
    const {get} = useHttpClient(token);
    return await get(BASE_URL + `/file/list?folder=${folder}`);
}