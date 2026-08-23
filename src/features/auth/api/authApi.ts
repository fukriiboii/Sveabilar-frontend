import { apiClient } from '../../../shared/api/apiClient';
import type { LoginResponse } from '../types/auth.types';

export async function login(email: string, password: string): Promise<LoginResponse> {
    
  return apiClient('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
}