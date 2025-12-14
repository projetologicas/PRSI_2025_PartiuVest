import axios from 'axios';
import type {User} from '../types/User';
import { getTokenCookie } from './Cookies';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
});

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${getTokenCookie()}`
    }
});

export const getXpLeaderboard = async (page: number, size: number) => {
    const response = await api.get<Page<User>>(`api/leaderboard/xp?page=${page}&size=${size}`, getAuthHeaders());
    return response.data;
};

export const getStreakLeaderboard = async (page: number, size: number) => {
    const response = await api.get<Page<User>>(`api/leaderboard/streak?page=${page}&size=${size}`, getAuthHeaders());
    return response.data;
};
export const getAdminStatus = async () => {
    const response = await api.get<string>('admin/status', getAuthHeaders());
    return response.data; 
};

export default api;