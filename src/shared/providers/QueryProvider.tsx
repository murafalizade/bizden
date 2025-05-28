'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
