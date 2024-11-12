// src/utils/api-response.ts
import { ApiResponse } from "../types/express/api_response";

export class ApiResponseHandler {
    static success<T>(data?: T, message: string = 'Operation successful', token?: string): ApiResponse<T> {
      return {
        code: 0,
        status: 'success',
        message,
        ...(data && { data }),
        ...(token && { token })
      };
    }
  
    static error(message: string = 'Operation failed', code: number = 1): ApiResponse<null> {
      return {
        code,
        status: 'error',
        message
      };
    }
  }
  