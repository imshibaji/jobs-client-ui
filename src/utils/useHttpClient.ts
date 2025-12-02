export function useHttpClient(token: string) {
    // Base headers are defined once
    const uHCheaders: Record<string, string> = {
        'accept': '*/*',
    };
    if (token) {
        uHCheaders['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Helper to correctly merge base headers, JSON headers, and custom headers.
     * When uploading files (FormData), 'Content-Type' is omitted because the browser sets the correct boundary.
     */
    const getHeaders = (customHeaders?: Record<string, string>, isFileUpload: boolean = false): Record<string, string> => {
        const headers: Record<string, string> = { ...uHCheaders };

        if (!isFileUpload) {
            headers['Content-Type'] = 'application/json';
        }

        return {
            ...headers,
            ...(customHeaders || {})
        };
    };

    /**
     * Core fetch logic wrapper for POST and PUT.
     * It intelligently handles JSON bodies vs. FormData bodies.
     */
    const handleBodyRequest = async (
        method: 'POST' | 'PUT' | 'PATCH',
        url: string,
        data: any,
        customHeaders?: Record<string, string>
    ) => {
        // Determine if the data is a file upload (FormData)
        const isFileUpload = data instanceof FormData;
        
        // Get the correct set of headers (omitting Content-Type for FormData)
        const headers = getHeaders(customHeaders, isFileUpload);
        
        // Determine the body: FormData is used directly; objects are stringified (unless it's null/undefined)
        const body = isFileUpload || data === undefined || data === null
            ? data
            : JSON.stringify(data);
            
        // Final Fetch Call
        return await fetch(url, {
            headers: headers,
            method: method,
            body: body,
        });
    };

    return {
        // GET function remains simple
        async get(url: string, customHeaders?: Record<string, string>) {
            return await fetch(url, {
                headers: getHeaders(customHeaders, false),
                method: 'GET',
            });
        },

        // POST: Supports JSON data (default) or FormData (for files)
        async post(url: string, data: any, customHeaders?: Record<string, string>) {
            return await handleBodyRequest('POST', url, data, customHeaders);
        },

        // PUT: Supports JSON data (default) or FormData (for files)
        async put(url: string, data: any, customHeaders?: Record<string, string>) {
            return await handleBodyRequest('PUT', url, data, customHeaders);
        },

        // PATCH: Also updated for consistency
        async patch(url: string, data: any, customHeaders?: Record<string, string>) {
            return handleBodyRequest('PATCH', url, data, customHeaders);
        },

        // DELETE function remains simple
        async delete(url: string, customHeaders?: Record<string, string>) {
            return await fetch(url, {
                headers: getHeaders(customHeaders, false),
                method: 'DELETE',
            });
        },

        // DOWNLOAD: Fetches and returns the response as a Blob (file content)
        async download(url: string, customHeaders?: Record<string, string>) {
            const response = await fetch(url, {
                headers: getHeaders(customHeaders, false),
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Download failed with status: ${response.status}`);
            }
            // Return the raw binary data
            return response; 
        },

        // The separate 'upload' function is now redundant but kept for legacy/clarity
        async upload(url: string, data: FormData, customHeaders?: Record<string, string>) {            
             return handleBodyRequest('POST', url, data, customHeaders);
        },
    };
}