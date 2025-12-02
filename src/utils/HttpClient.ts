export class HttpClient {
    private baseHeaders: Record<string, string> = {};

    constructor(token: string) {
        // 1. Set base authorization headers
        this.baseHeaders['accept'] = '*/*';
        if (token) {
            this.baseHeaders['Authorization'] = `Bearer ${token}`;
        }
    }

    /**
     * Helper to correctly merge base headers with custom headers and conditionally omit Content-Type for file uploads.
     */
    private getHeaders(customHeaders?: Record<string, string>, isFileUpload: boolean = false): Record<string, string> {
        const headers: Record<string, string> = { ...this.baseHeaders };

        // Do NOT set Content-Type for FormData, the browser handles it.
        if (!isFileUpload) {
            headers['Content-Type'] = 'application/json';
        }

        return {
            ...headers,
            ...(customHeaders || {})
        };
    }

    /**
     * Core handler for body-based requests (POST, PUT, PATCH).
     * Automatically switches between JSON (default) and FormData (for files).
     */
    private async handleBodyRequest(
        method: 'POST' | 'PUT' | 'PATCH',
        url: string,
        data: any,
        customHeaders?: Record<string, string>
    ) {
        // Check if data is a file upload object
        const isFileUpload = data instanceof FormData;
        
        // Get the correct headers, omitting Content-Type if uploading files
        const headers = this.getHeaders(customHeaders, isFileUpload);
        
        // Prepare the body: FormData is used directly; other objects are stringified
        const body = isFileUpload || data === undefined || data === null
            ? data
            : JSON.stringify(data);
            
        const response = await fetch(url, {
            headers: headers,
            method: method,
            body: body,
        });

        // Ensure you check the response status before attempting to parse JSON,
        // as file uploads or deletions often return an empty body (204 No Content).
        if (response.status === 204) {
             return response; // Return the raw response for status check
        }
        
        return response.json();
    }


    // --- Public Methods ---

    // GET: Supports custom headers
    async get(url: string, customHeaders?: Record<string, string>) {
        const response = await fetch(url, {
            headers: this.getHeaders(customHeaders, false),
            method: 'GET',
        });
        // Added raw response return for status checking (e.g., 200 vs 404)
        if (!response.ok) {
            return response.json(); 
        }
        return response.json();
    }

    // POST: Supports JSON or FormData, and custom headers
    async post(url: string, data: any, customHeaders?: Record<string, string>) {
        return this.handleBodyRequest('POST', url, data, customHeaders);
    }

    // PUT: Supports JSON or FormData, and custom headers
    async put(url: string, data: any, customHeaders?: Record<string, string>) {
        return this.handleBodyRequest('PUT', url, data, customHeaders);
    }

    // PATCH: Supports JSON or FormData, and custom headers
    async patch(url: string, data: any, customHeaders?: Record<string, string>) {
        return this.handleBodyRequest('PATCH', url, data, customHeaders);
    }

    // DELETE: Supports custom headers. Returns raw response to handle 204 No Content.
    async delete(url: string, customHeaders?: Record<string, string>) {
        const response = await fetch(url, {
            headers: this.getHeaders(customHeaders, false),
            method: 'DELETE',
        });
        
        // A successful DELETE often returns 204 No Content (no body)
        if (response.status === 204) {
            return response; // Return raw response object
        }
        return response.json();
    }

    // DOWNLOAD: Supports custom headers. Returns Blob (file content).
    async download(url: string, customHeaders?: Record<string, string>) {
        const response = await fetch(url, {
            headers: this.getHeaders(customHeaders, false),
            method: 'GET',
        });
        
        if (!response.ok) {
            // Throw an error or return an object indicating failure
            throw new Error(`Download failed with status: ${response.status}`);
        }
        
        return response;
    }

    // UPLOAD: Supports custom headers. Returns Blob (file content).
    async upload(url: string, data: any, customHeaders?: Record<string, string>) {
        const response = await fetch(url, {
            headers: this.getHeaders(customHeaders, true),
            method: 'POST',
            body: data,
        });
        
        if (!response.ok) {
            // Throw an error or return an object indicating failure
            throw new Error(`Upload failed with status: ${response.status}`);
        }
        
        return response.json();
    }
}