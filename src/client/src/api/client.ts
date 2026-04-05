import ky from 'ky';

const api = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;