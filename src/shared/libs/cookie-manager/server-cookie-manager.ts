import { cookies } from 'next/headers';
import { JWT_TOKEN_KEY } from '@shared/constants';
import { AxiosResponse } from 'axios';
import service from '@shared/libs/service';

export class ServerCookieManager {
  static async getRawCookie(key: string): Promise<string | undefined> {
    return (await cookies()).get(key)?.value;
  }

  static async setCookie(value: string) {
    (await cookies()).set({
      name: JWT_TOKEN_KEY,
      value,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
  }

  static async deleteCookie(key: string) {
    (await cookies()).delete(key);
  }

  static async getCookie(): Promise<string | undefined> {
    const token = await this.getRawCookie(JWT_TOKEN_KEY);
    const refreshToken = await this.getRawCookie('refresh_token');
    if (!token && refreshToken) {
      return await this.refreshToken();
    }
    return token;
  }

  static async refreshToken() {
    const token: AxiosResponse<string> = await service.post('/api/auth/refresh-token');
    await this.setCookie(token.data);
    return token.data;
  }
}
