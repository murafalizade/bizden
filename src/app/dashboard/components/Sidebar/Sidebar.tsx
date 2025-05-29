import React, { useMemo } from 'react';
import { Grid, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@shared/hooks/useAuth';
import { UserRole } from '@shared/libs/models';
import { usePathname } from 'next/navigation';
import { sidebarItems } from '@app/dashboard/libs/sidebar-items';

interface SidebarProps {
  // Define your props here
}

const { useBreakpoint } = Grid;

export const Sidebar: React.FC<SidebarProps> = () => {
  const { user, logout } = useAuth();
  const screens = useBreakpoint();

  const menuItems = useMemo(() => {
    return sidebarItems
      .filter(menuItem => {
        if (menuItem.accessRoles.length === 0 || user?.role === UserRole.Admin) return true;
        if (!user) return false;
        return menuItem.accessRoles.includes(user.role);
      })
      .map(({ accessRoles, ...rest }) => rest);
  }, [user]);

  const pathname = usePathname();

  const selectedKey = useMemo(() => {
    if (pathname.startsWith('/dashboard/create-opportunity')) return 'create';
    if (pathname.startsWith('/dashboard/search')) return 'search';
    if (pathname.startsWith('/dashboard/opportunities')) return 'my-offers';
    if (pathname.startsWith('/dashboard/applications')) return 'my-discounts';
    if (pathname.startsWith('/dashboard/profile')) return 'profile';
    if (pathname.startsWith('/dashboard')) return 'dashboard';
    return '';
  }, [pathname]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-20 flex items-center justify-center text-white text-2xl font-bold border-b">
        BIZDƏN
      </div>

      <div className="flex-1 overflow-auto py-4">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['home']}
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{
            fontSize: '16px',
            padding: '16px',
            paddingBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        />
      </div>

      <div style={{ padding: '16px 0' }}>
        <Menu
          theme="dark"
          mode="inline"
          selectable={false}
          items={[
            {
              key: 'logout',
              icon: <LogoutOutlined style={{ fontSize: '20px' }} />,
              label: <span onClick={logout}>Çıxış</span>,
            },
          ]}
          style={{
            fontSize: '16px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '12px',
            paddingLeft: '8px',
            paddingRight: '8px',
          }}
        />
      </div>
    </div>
  );
};
