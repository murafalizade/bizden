import { useAuth } from '@/shared/hooks/useAuth';
import React from 'react';
import { Avatar, Badge, Button, Dropdown, Grid, Space } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';
import {
  BellOutlined,
  CloseOutlined,
  InfoCircleFilled,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import Title from 'antd/es/typography/Title';
import { useRouter } from 'next/navigation';
import { getNotifications } from '@app/dashboard/notifications/libs/services';
import { UserNotification } from '@app/dashboard/notifications/libs/models';
import { userRoleMapper } from '@shared/libs/user-role-mapper';
import { UserRole } from '@shared/libs/models';
import Link from 'next/link';

const { useBreakpoint } = Grid;

interface HeaderProps {
  // Define your props here
}

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const screens = useBreakpoint();

  const profileMenuItems = [
    {
      key: 'profile',
      label: <Link href={'/dashboard/profile'}>Profil</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: <p onClick={logout}>Çıxış</p>,
      icon: <LogoutOutlined />,
    },
  ];

  const { data: notifications = [] } = useQuery<UserNotification[]>({
    queryKey: ['NOTIFICATIONS'],
    queryFn: () => getNotifications(),
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const notificationMenuItems = notifications.slice(0, 5).map(notification => ({
    key: notification.id.toString(),
    label: (
      <div
        onClick={() => router.push('/dashboard/notifications')}
        className={`${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}
      >
        <Space align="start" size="small">
          {!notification.isRead && <InfoCircleFilled className="text-blue-500 text-sm mt-1" />}
          <p className={`text-sm leading-snug ${!notification.isRead ? 'font-semibold' : ''}`}>
            {notification.message}
          </p>
        </Space>
      </div>
    ),
  }));

  if (notifications.length > 5) {
    notificationMenuItems.push({
      key: 'more',
      label: (
        <div className="text-center py-2 cursor-default">
          <Button type="link" onClick={() => router.push('/dashboard/notifications')}>
            Daha çox göstər
          </Button>
        </div>
      ),
    });
  }

  return (
    <>
      {!user?.isVerified && (
        <div
          className="bg-red-50 text-lg text-red-700 flex items-center justify-center px-6 z-999 top-0 "
          style={{ height: 60 }}
        >
          <span>Hesabınız hələ administrator tərəfindən təsdiqlənməyib.</span>
          <CloseOutlined className="ml-4 text-xl cursor-pointer" />
        </div>
      )}

      <AntHeader
        style={{
          background: '#fff',
          padding: screens.md ? '0 24px' : '0 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
          position: 'sticky',
          top: !user?.isVerified ? 48 : 0,
          zIndex: 100,
        }}
      >
        <Title level={screens.md ? 3 : 4} style={{ margin: 0 }}>
          Xoş gəlmisiniz!
        </Title>
        <Space size="large" align="center" style={{ marginRight: 24 }}>
          <div style={{ marginTop: '15px' }}>
            <Dropdown
              menu={{ items: notificationMenuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Badge count={unreadCount}>
                <BellOutlined style={{ fontSize: screens.md ? 24 : 20, cursor: 'pointer' }} />
              </Badge>
            </Dropdown>
          </div>

          <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" trigger={['click']}>
            <div className="cursor-pointer">
              <Space size="small" align="center">
                <Avatar className="bg-blue-700! text-white font-medium" size="large">
                  {user?.fullName?.charAt(0) || 'U'}
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <p className="font-semibold leading-6">{user?.fullName || 'User'}</p>
                  <p className="text-xs text-gray-500 leading-none">
                    {userRoleMapper[user?.role as UserRole]}
                  </p>
                </div>
              </Space>
            </div>
          </Dropdown>
        </Space>
      </AntHeader>
    </>
  );
};
