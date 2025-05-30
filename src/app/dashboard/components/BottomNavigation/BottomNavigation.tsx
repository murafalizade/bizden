import { useAuth } from '@/shared/hooks/useAuth';
import React from 'react';
import { Grid, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { sidebarItems } from '@app/dashboard/libs/sidebar-items';

interface BottomNavigationProps {
  // Define your props here
}

const { useBreakpoint } = Grid;

export const BottomNavigation: React.FC<BottomNavigationProps> = props => {
  const { user } = useAuth();
  const screens = useBreakpoint();
  const router = useRouter();

  if (screens.md) return null;

  const mobileItems = sidebarItems
    .filter(({ accessRoles }) => {
      if (accessRoles.length === 0) return true;
      return user ? accessRoles.includes(user.role) : false;
    })
    .map(({ key, icon, path }) => ({
      key,
      icon,
      onClick: () => router.push(path),
    }));

  return (
    <div className="px-1  fixed bottom-0 left-0 right-0 border-t bg-[#001529] z-10">
      <Menu
        theme="dark"
        mode="horizontal"
        items={mobileItems}
        className="flex justify-around items-center h-14 bg-[#001529] text-white"
      />
    </div>
  );
};
