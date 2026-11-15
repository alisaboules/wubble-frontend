import { API_URL } from '@/constants/api.constants';
import type { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { authService } from '@/services/auth.services';

const options: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const axiosClassic = axios.create(options);

export const instance = axios.create(options);

type RetryConfig = InternalAxiosRequestConfig & {
  _isRetry?: boolean;
};

let refreshPromise: Promise<void> | null = null;

instance.interceptors.request.use((config) => {
  const accessToken = typeof document !== 'undefined'
    ? document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('wubble_access='))
        ?.split('=')[1]
    : undefined;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${decodeURIComponent(accessToken)}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    const originRequest = error.config as RetryConfig | undefined;
    if (error.response?.status !== 401 || !originRequest || originRequest._isRetry
    ) {
      throw error;
    }
    originRequest._isRetry = true;
    try {
      if (!refreshPromise) {
        refreshPromise = authService.getNewTokens()
          .then(() => undefined)
          .finally(() => {
            refreshPromise = null;
          });
      }
      await refreshPromise;

      return instance.request(originRequest);
    } catch (refreshError) {
      if (axios.isAxiosError(refreshError) && refreshError.response?.status === 401
      ) {
        authService.removeFromStorage();
      }

      throw refreshError;
    }
  }
);