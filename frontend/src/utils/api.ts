const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
    async fetch(endpoint: string, options: RequestInit = {}) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }
};
