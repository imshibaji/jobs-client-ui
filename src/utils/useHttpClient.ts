export function useHttpClient(token: string) {
    const headers: Record<string, string>= {};
    if (token) {
        headers['accept'] = '*/*';
        headers['Authorization'] = `Bearer ${token}`;
    }
    return {
        async get(url: string) {
            return await fetch(url, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
        },
        async post(url: string, data: any) {
            return await fetch(url, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
            });
        },
        async put(url: string, data: any) {
            return await fetch(url, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(data),
            });
        },
        async delete(url: string) {
            return await fetch(url, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });
        },
        async patch(url: string, data: any) {
            return await fetch(url, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                method: 'PATCH',
                body: JSON.stringify(data),
            });
        },
        async upload(url: string, data: FormData) {            
            return await fetch(url, {
                headers,
                method: 'POST',
                body: data,
            });
        },
        async download(url: string) {
            return await fetch(url, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            }).then(response => response.blob());
        },
    };
}