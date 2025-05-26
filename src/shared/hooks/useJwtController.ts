import {JWT_TOKEN_KEY} from "@shared/constants";
import {jwtDecode} from "jwt-decode";
import {IJwtPayload} from "@shared/libs/models";

export const useJwtController = () => {

    const getJwtPayload = (): IJwtPayload | null => {

        try {
            const token = localStorage.getItem(JWT_TOKEN_KEY);
            if (!token) return null;

            const payload: IJwtPayload = jwtDecode(token);

            if (typeof payload.exp !== 'number') return null;

            const currentTime = Math.floor(Date.now() / 1000);
            if (payload.exp < currentTime) return null;

            return payload;
        } catch (error) {
            return null;
        }
    };

    const setJwt = (token: string): void => {
        localStorage.setItem(JWT_TOKEN_KEY, token);
    }
    return {getJwtPayload, setJwt}
}
