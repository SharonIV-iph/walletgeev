import { useCallback, useMemo, useState } from 'react';

import { ApiService } from '@/lib/services/api.service';
import { ApiError, ApiResponse } from '@/lib/types/api';

export const useApi = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const api = useMemo(() => new ApiService({ baseURL }), [baseURL]);

    const request = useCallback(
        async <T>(
            method: 'get' | 'post' | 'put' | 'delete' | 'patch',
            endpoint: string,
            data?: any,
            options?: RequestInit
        ): Promise<ApiResponse<T> | null> => {
            setLoading(true);
            setError(null);

            try {
                let response: ApiResponse<T>;
                switch (method) {
                    case 'get':
                        response = await api.get<T>(endpoint, options);
                        break;
                    case 'post':
                        response = await api.post<T>(endpoint, data, options);
                        break;
                    case 'put':
                        response = await api.put<T>(endpoint, data, options);
                        break;
                    case 'delete':
                        response = await api.delete<T>(endpoint, options);
                        break;
                    case 'patch':
                        response = await api.patch<T>(endpoint, data, options);
                        break;
                }
                return response;
            } catch (err) {
                setError(err as ApiError);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [api]
    );

    const get = useMemo(
        () =>
            <T>(endpoint: string, options?: RequestInit) =>
                request<T>('get', endpoint, undefined, options),
        [request]
    );

    const post = useMemo(
        () =>
            <T>(endpoint: string, data: any, options?: RequestInit) =>
                request<T>('post', endpoint, data, options),
        [request]
    );

    const put = useMemo(
        () =>
            <T>(endpoint: string, data: any, options?: RequestInit) =>
                request<T>('put', endpoint, data, options),
        [request]
    );

    const del = useMemo(
        () =>
            <T>(endpoint: string, options?: RequestInit) =>
                request<T>('delete', endpoint, undefined, options),
        [request]
    );

    const patch = useMemo(
        () =>
            <T>(endpoint: string, data: any, options?: RequestInit) =>
                request<T>('patch', endpoint, data, options),
        [request]
    );

    return {
        loading,
        error,
        get,
        post,
        put,
        delete: del,
        patch
    };
};
