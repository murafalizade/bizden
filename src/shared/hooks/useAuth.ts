import { ClientCookieManager } from '@shared/libs/cookie-manager/client-cookie-manager';
import { jwtDecoder } from '@shared/libs/helpers';

export const useAuth = () => {
  const getUser = () => {
    const jwt = ClientCookieManager.getCookie();
    const decodedUser = jwtDecoder(jwt);
    if (!decodedUser) return null;
    return decodedUser;
  };

  const logout = () => {
    ClientCookieManager.deleteCookie();
  };

  return { user: getUser(), logout };
};
