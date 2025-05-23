import { cookies } from 'next/headers';
import { Hash } from './hash';
import {JWT_TOKEN_KEY} from "@shared/constants";

export class CookieManager {
    static async getRawCookie(key: string): Promise<string | undefined> {
        const hashedKey = Hash.hashKey(key);
        const encryptedValue = (await cookies()).get(hashedKey)?.value;
        if (!encryptedValue) return undefined;
        try {
            return Hash.decrypt(encryptedValue);
        } catch {
            return undefined;
        }
    }

    static async setCookie(value: string) {
        const hashedKey = Hash.hashKey(JWT_TOKEN_KEY);
        const encryptedValue = Hash.encrypt(value);
       (await cookies()).set({
            name: hashedKey,
            value: encryptedValue,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
        });
    }

    static async deleteCookie(key: string) {
        const hashedKey = Hash.hashKey(key);
        (await cookies()).delete(hashedKey);
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
        // Redirect to a refresh endpoint or trigger server-side refresh
        // Typically this could involve calling `/api/refresh-token` or similar
        console.log('Access token expired. Triggering refresh...');
        // You might want to store this action in a queue or session state
    }
}
