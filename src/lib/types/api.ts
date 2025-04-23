export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface ApiConfig {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
} 