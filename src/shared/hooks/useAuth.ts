import { useEffect, useState } from 'react';
import { ClientCookieManager } from '@shared/libs/cookie-manager/client-cookie-manager';
import { jwtDecoder } from '@shared/libs/helpers';
import { IJwtPayload } from '@shared/libs/models';

export const useAuth = () => {
  const [user, setUser] = useState<IJwtPayload | null>(null);

  useEffect(() => {
    const jwt = ClientCookieManager.getCookie();
    const decodedUser = jwtDecoder(jwt);
    if (decodedUser) setUser(decodedUser);
  }, []);

  const logout = () => {
    ClientCookieManager.deleteCookie();
    setUser(null);
  };

  return { user, logout };
};
