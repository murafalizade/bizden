import React from 'react';
import { Sidebar } from '@app/dashboard/components/Sidebar';
import { Header } from '@app/dashboard/components/Header';
import { BottomNavigation } from '@app/dashboard/components/BottomNavigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const AppDashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-[280px] shrink-0 fixed top-0 left-0 bottom-0 z-50 bg-white shadow-md">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 ml-[280px] transition-all">
        <Header />
        <main className="m-6 p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4">
          {children}
        </main>
      </div>

      <BottomNavigation />
    </div>
  );
};
