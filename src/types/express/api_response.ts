export interface ApiResponse<T> {
    code: number;
    status: 'success' | 'error';
    message: string;
    data?: T;
    token?: string;
  }
