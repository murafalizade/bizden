import { useAuth } from '@/shared/hooks/useAuth';
import React from 'react';
import { Avatar, Badge, Button, Dropdown, Space } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';
import {
  BellOutlined,
  CloseOutlined,
  InfoCircleFilled,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getNotifications } from '@app/dashboard/notifications/libs/services';
import { UserNotification } from '@app/dashboard/notifications/libs/models';
import { userRoleMapper } from '@shared/libs/user-role-mapper';
import { UserRole } from '@shared/libs/models';
import Link from 'next/link';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

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
        <div className="bg-red-50 text-red-700 h-[60px] flex items-center justify-center top-0 z-[999] border-b border-red-300 px-12 font-medium text-base">
          <span>Hesabınız hələ administrator tərəfindən təsdiqlənməyib.</span>
          <CloseOutlined className="ml-6 text-lg cursor-pointer text-gray-500" />
        </div>
      )}

      <AntHeader className="bg-white! px-6 border-b border-gray-200 flex justify-between items-center z-10">
        <h1 className="text-2xl font-semibold">Xoş gəlmisiniz!</h1>

        <Space size="large" align="center" className="mr-6">
          <div>
            <Dropdown
              menu={{ items: notificationMenuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Badge count={unreadCount}>
                <BellOutlined className="text-xl cursor-pointer" />
              </Badge>
            </Dropdown>
          </div>

          <Dropdown
            menu={{ items: profileMenuItems }}
            overlayStyle={{ width: 350 }}
            placement="bottomRight"
            trigger={['click']}
          >
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
