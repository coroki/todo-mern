import { useMemo } from 'react';
import axios from 'axios';

type HttpClientConfig = {
    baseURL?: string;
    headers?: Record<string, string>;
    responseType?: 'json' | 'text';
};

type HttpRequestOptions = {
    headers?: Record<string, string>;
    params?: Record<string, string>;
};

type HttpClient = {
    get: <T>(url: string, options?: HttpRequestOptions) => Promise<T>;
    post: <T>(url: string, data: unknown, options?: HttpRequestOptions) => Promise<T>;
    delete: <T>(url: string, options?: HttpRequestOptions) => Promise<T>;
};

export const useHttpClient = (config?: HttpClientConfig): HttpClient => {
    return useMemo(() => {
        const client = axios.create(config);

        const get = async <T>(url: string, options: HttpRequestOptions): Promise<T> => {
            const response = await client.get<T>(url, options);
            return response.data;
        };

        const post = async <T>(url: string, data: unknown, options: HttpRequestOptions): Promise<T> => {
            const response = await client.post<T>(url, data, options);
            return response.data;
        };

        const del = async <T>(url: string, options: HttpRequestOptions): Promise<T> => {
            const response = await client.delete<T>(url, options);
            return response.data;
        };

        return { get, post, delete: del };
    }, []);
};
