import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { QueryProvider } from '@shared/providers/QueryProvider';
import { ReduxProvider } from '@shared/providers/ReduxProvider';

export const metadata: Metadata = {
  title: 'BIZDƏN – Tələbələr, veteranlar və şəhid ailələri üçün endirimlər',
  description:
    'BIZDƏN tələbələr, veteranlar və şəhid ailələri üçün endirimlər və pulsuz fürsətlər təqdim edən platformadır.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
