'use client';
import React, { useEffect, useRef } from 'react';
import { ClientCookieManager } from '@shared/libs/cookie-manager/client-cookie-manager';
import { jwtDecoder } from '@shared/libs/helpers';
import { useMutation } from '@tanstack/react-query';
import { refreshToken } from '@app/(authless)/register/libs/services';

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { mutate: refresh } = useMutation({
    mutationFn: refreshToken,
    onSuccess: token => {
      ClientCookieManager.setCookie(token);
      scheduleRefresh(token);
    },
    onError: error => {
      ClientCookieManager.deleteCookie();
    },
  });

  const scheduleRefresh = (jwt: string) => {
    const decodedJwt = jwtDecoder(jwt);
    if (!decodedJwt || !decodedJwt.exp) return;

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = decodedJwt.exp - currentTime;
    console.log(timeLeft);
    if (timeLeft <= 60 * 5) {
      refresh();
      return;
    }

    const refreshIn = (timeLeft - 60 * 5) * 1000;
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      refresh();
    }, refreshIn);
  };

  useEffect(() => {
    const jwt = ClientCookieManager.getCookie();
    if (!jwt) return;

    scheduleRefresh(jwt);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return <>{children}</>;
};
