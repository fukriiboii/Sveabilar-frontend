import {
  getAccessToken,
  removeAccessToken,
} from '../../features/auth/utils/authStorage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const PUBLIC_ENDPOINTS = [
  '/api/auth/login',
  '/api/services',
  '/api/availability/',
  '/api/bookings',
];

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const token = getAccessToken();

  const headers = new Headers(options?.headers);
  const isPublicEndpoint = PUBLIC_ENDPOINTS.some((publicEndpoint) =>
    endpoint.startsWith(publicEndpoint),
  );

  headers.set('Content-Type', 'application/json');

  if (token && !isPublicEndpoint) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      removeAccessToken();
    }

    throw new Error('API request failed');
  }

  if (response.status === 204 || response.status === 205) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    return undefined as T;
  }

  return response.json();
}