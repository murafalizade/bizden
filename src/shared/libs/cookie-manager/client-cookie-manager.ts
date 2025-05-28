import Cookies from 'js-cookie';
import { BASE_API_URL, JWT_TOKEN_KEY } from '@shared/constants';
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
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });
  }

  static deleteCookie() {
    Cookies.remove(JWT_TOKEN_KEY);
  }

  static getCookie(): string | undefined {
    return this.getRawCookie(JWT_TOKEN_KEY);
  }
}
