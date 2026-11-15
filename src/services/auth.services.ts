import type { TUser } from '@/types/user.types';
import type { TAuthFormData } from '@/types/auth.types';
import { store } from '@/store';
import { clearAuthData } from '@/store/auth.slice';
import { axiosClassic, instance } from '@/api/axios';

// interface TAuthResponse {
//   user: TUser,
//   accessToken: string
// }

class AuthService {
  private _AUTH = '/api/auth';

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

  async getNewTokens() {
    return axiosClassic.post<void>(`${this._AUTH}/refresh`);
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
