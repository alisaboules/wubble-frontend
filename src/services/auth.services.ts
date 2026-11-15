import type { TUser } from '@/types/user.types';
import type { TAuthFormData } from '@/types/auth.types';
import { store } from '@/store';
import { clearAuthData } from '@/store/auth.slice';
import { axiosClassic, instance } from '@/api/axios';
import { AxiosResponse } from 'axios';

// interface TAuthResponse {
//   user: TUser,
//   accessToken: string
// }

class AuthService {
  private _AUTH = '/api/auth';
  private refreshPromise: Promise<AxiosResponse<void>> | null = null;
  
  async main(type: 'login' | 'register', data: TAuthFormData, recaptchaToken?: string | null) {
    const response = await axiosClassic.post<TUser | void>(
      `${this._AUTH}/${type}`,
      {
        ...data,
        recaptchaToken,
      },
      {
        withCredentials: true,
      },
    );

    return response;
  }

  getNewTokens(): Promise<AxiosResponse<void>> {
  if (!this.refreshPromise) {
    this.refreshPromise = axiosClassic
      .post<void>(
        `${this._AUTH}/refresh`,
        {},
        {
          withCredentials: true,
        },
      )
      .finally(() => {
        this.refreshPromise = null;
      });
  }

  return this.refreshPromise;
}

  async getMe() {
    return instance.get<TUser>(`${this._AUTH}/me`);
  }

  async logout() {
    const response = await axiosClassic.post<void>(`${this._AUTH}/logout`);

    this.removeFromStorage();

    return response;
  }

  removeFromStorage() {
    store.dispatch(clearAuthData());
  }
}

export const authService = new AuthService();
