// src/pages/api/download.ts
import { useHttpClient } from '@/utils/useHttpClient';
import type { APIRoute } from 'astro';
import { BASE_URL } from "astro:env/client";

export const GET: APIRoute = async ({ request, cookies, url }) => {
    const token = cookies.get('token')?.value;
    const {download} = useHttpClient(token!);
    const fileName = url.searchParams.get('file');

    if (!fileName) {
        return new Response("File name missing", { status: 400 });
    }

    // Fetch the file from your backend API
    const response = await download(BASE_URL + `/file/download?Folder=resumes&Filename=${fileName}`);

    if (!response.ok) {
        return new Response("File not found", { status: 404 });
    }

    // Return the file stream directly to the browser
    return new Response(response.body, {
        headers: {
            'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        },
    });
};
