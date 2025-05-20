import type { Metadata } from 'next';
import React from 'react';
import { ReactQueryProvider } from '@/shared/components/ReactQueryClient';

export const metadata: Metadata = {
    title: 'BIZDƏN – Qeydiyyatdan keç',
    description:
        'BIZDƏN tələbələr, veteranlar və şəhid ailələri üçün endirimlər və pulsuz fürsətlər təqdim edən platformadır.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <div className="flex items-center justify-center h-screen animated-bg">
                {children}
            </div>
        </ReactQueryProvider>
    );
}
