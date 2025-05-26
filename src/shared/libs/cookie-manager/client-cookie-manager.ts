import Cookies from 'js-cookie';
import { Hash } from '../hash';
import { JWT_TOKEN_KEY } from '@shared/constants';

export class ClientCookieManager {
    static async getRawCookie(key: string): Promise<string | undefined> {
        const hashedKey = await Hash.hashKey(key);
        const encryptedValue = Cookies.get(hashedKey);
        if (!encryptedValue) return undefined;

        try {
            return Hash.decrypt(encryptedValue);
        } catch {
            return undefined;
        }
    }

    static async setCookie(value: string) {
        const hashedKey = await Hash.hashKey(JWT_TOKEN_KEY);
        const encryptedValue = await Hash.encrypt(value);
        Cookies.set(hashedKey, encryptedValue, {
            secure: true,
            sameSite: 'lax',
            path: '/',
            // httpOnly can't be set on the client
        });
    }

    static async deleteCookie(key: string) {
        const hashedKey = await Hash.hashKey(key);
        Cookies.remove(hashedKey);
    }

    static async getCookie(): Promise<string | null> {
        const token = await this.getRawCookie(JWT_TOKEN_KEY);
        if (!token) {
            this.refreshToken();
            return null;
        }
        return token;
    }

    static refreshToken() {
        console.log('Client-side access token expired. Triggering refresh...');
        // Example:
        // window.location.href = '/api/refresh-token';
    }
}
