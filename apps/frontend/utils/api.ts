import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const searchProducts = async (query: string) => {
    const res = await axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    return res.data;
};
