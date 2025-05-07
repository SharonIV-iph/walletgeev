import { ApiConfig, ApiError, ApiResponse } from '../types/api';

export class ApiService {
    private config: ApiConfig;

    constructor(config: ApiConfig) {
        this.config = config;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        try {
            const url = `${this.config.baseURL}${endpoint}`;
            const headers = {
                'Content-Type': 'application/json',
                ...this.config.headers,
                ...options.headers
            };

            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw {
                    message: data.message || 'An error occurred',
                    status: response.status,
                    errors: data.errors
                } as ApiError;
            }

            return {
                data: data as T,
                status: response.status,
                message: data.message
            };
        } catch (error) {
            if (error instanceof Error) {
                throw {
                    message: error.message,
                    status: 500
                } as ApiError;
            }
            throw error;
        }
    }

    async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    async post<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    async put<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    async delete<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }

    async patch<T>(endpoint: string, data: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }
}
