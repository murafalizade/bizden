import type { Metadata } from 'next';
import React from 'react';
import { AppDashboardLayout } from '@app/dashboard/components/AppDashboardLayout';

export const metadata: Metadata = {
  title: 'BIZDƏN – Tələbələr, veteranlar və şəhid ailələri üçün endirimlər',
  description:
    'BIZDƏN tələbələr, veteranlar və şəhid ailələri üçün endirimlər və pulsuz fürsətlər təqdim edən platformadır.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppDashboardLayout>{children}</AppDashboardLayout>;
}
