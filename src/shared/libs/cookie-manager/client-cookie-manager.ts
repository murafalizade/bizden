import Cookies from 'js-cookie';
import { JWT_TOKEN_KEY } from '@shared/constants';
import axios, { AxiosResponse } from 'axios';

export class ClientCookieManager {
  static getRawCookie(key: string): string | undefined {
    return Cookies.get(key);
  }

  static setCookie(value: string) {
    Cookies.set(JWT_TOKEN_KEY, value, {
      secure: true,
      sameSite: 'lax',
      path: '/',
      // httpOnly can't be set on the client
    });
  }

  static deleteCookie(key: string) {
    Cookies.remove(key);
  }

  static async getCookie(): Promise<string | undefined> {
    const token = this.getRawCookie(JWT_TOKEN_KEY);
    const refreshToken = this.getRawCookie('refresh_token');
    if (!token && refreshToken) {
      return await this.refreshToken();
    }
    return token;
  }

  static async refreshToken() {
    const token: AxiosResponse<string> = await axios.post('/api/auth/refresh-token');
    this.setCookie(token.data);
    return token.data;
  }
}
