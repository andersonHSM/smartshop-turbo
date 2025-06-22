import axios from 'axios';

const API_ENDPOINT = process.env.NEXT_PUBLIC_SEARCH_API || 'http://localhost:3001/api';

const axiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const searchProducts = async (query: string) => {
    return axiosInstance.get(`/search?query=${query}`);
};

export const syncWithAirtable = async () => {
    return axiosInstance.post('/catalog/sync');
};

export const submitFeedback = async (body: { query: string; rank: number; productId: string; reward: number }) => {
    return axiosInstance.post('catalog/feedback', body);
};
