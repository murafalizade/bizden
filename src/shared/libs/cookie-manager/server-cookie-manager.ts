import { cookies } from 'next/headers';
import { BASE_API_URL, JWT_TOKEN_KEY } from '@shared/constants';
import axios, { AxiosResponse } from 'axios';
import service from '@shared/libs/service';

export class ServerCookieManager {
  static async getRawCookie(key: string): Promise<string | undefined> {
    return (await cookies()).get(key)?.value;
  }

  static async setCookie(value: string) {
    (await cookies()).set({
      name: JWT_TOKEN_KEY,
      value,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });
  }

  static async deleteCookie(key: string) {
    (await cookies()).delete(key);
  }

  static async getCookie(): Promise<string | undefined> {
    return await this.getRawCookie(JWT_TOKEN_KEY);
  }
}
