import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'BIZDƏN – Qeydiyyatdan keç',
    description:
        'BIZDƏN tələbələr, veteranlar və şəhid ailələri üçün endirimlər və pulsuz fürsətlər təqdim edən platformadır.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
            <div className="flex items-center justify-center h-screen animated-bg">
                {children}
            </div>
    );
}
