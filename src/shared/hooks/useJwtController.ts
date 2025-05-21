import {JWT_TOKEN_KEY} from "@shared/constants";
import {jwtDecode} from "jwt-decode";
import {IJwtPayload} from "@shared/libs/models";

export const useJwtController = () => {

    const getJwtPayload = (): IJwtPayload | null => {
        const token = localStorage.getItem(JWT_TOKEN_KEY);
        if (!token) return null;

        try {
            const payload: IJwtPayload = jwtDecode(token);

            // Check if `exp` is a valid number and not expired
            if (typeof payload.exp !== 'number') return null;

            const currentTime = Math.floor(Date.now() / 1000);
            if (payload.exp < currentTime) return null;

            return payload;
        } catch (error) {
            return null;
        }
    };

    const setJwt = (token: string): void => {
        localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify(token));
    }
    return {getJwtPayload, setJwt}
}
