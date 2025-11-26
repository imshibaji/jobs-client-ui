export class HttpClient {
    private headers: Record<string, string>= {};
    
    constructor(token: string) {
        if (token) {
            this.headers['accept'] = '*/*';
            this.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    async get(url: string) {
        const response = await fetch(url, {
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
        return response.json();
    }
    async post(url: string, data: any) {
        const response = await fetch(url, {
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response.json();
    }
    async put(url: string, data: any) {
        const response = await fetch(url, {
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(data),
        });
        return response.json();
    }
    async delete(url: string) {
        const response = await fetch(url, {
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        });
        return response.json();
    }
    async patch(url: string, data: any) {
        const response = await fetch(url, {
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify(data),
        });
        return response.json();
    }
    async upload(url: string, data: FormData) {
        const response = await fetch(url, {
            headers: this.headers,
            method: 'POST',
            body: data,
        });
        return response.json();
    }
    async download(url: string) {
        const response = await fetch(url, {
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
        return response.blob();
    }
}