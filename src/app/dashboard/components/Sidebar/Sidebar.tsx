import React from 'react';
import { Grid, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { menuItems } from '@app/dashboard/libs/menu-items';
import { useAuth } from '@shared/hooks/useAuth';
import { UserRole } from '@shared/libs/models';

interface SidebarProps {
  // Define your props here
}

const { useBreakpoint } = Grid;

export const Sidebar: React.FC<SidebarProps> = () => {
  const { user, logout } = useAuth();
  const screens = useBreakpoint();
  const accessibleMenuItems = menuItems!.filter(menuItem => {
    if (menuItem.accessRoles.length === 0 || user?.role === UserRole.Admin) return true;
    if (!user) return false;
    return menuItem.accessRoles.includes(user.role);
  });

  return (
    <div className="h-full flex flex-col">
      <div className="h-20 flex items-center px-6 text-white text-2xl font-bold border-b">
        BIZDƏN!
      </div>

        <div className="flex-1 overflow-auto py-4">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['home']}
          // selectedKeys={[selectedItem]}
          items={accessibleMenuItems}
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
