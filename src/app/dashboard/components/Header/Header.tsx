import { useAuth } from '@/shared/hooks/useAuth';
import React, { useState } from 'react';
import { Avatar, Badge, Button, Divider, Dropdown, Grid, Menu, Space } from 'antd';
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
import Text from 'antd/es/typography/Text';
import { useRouter } from 'next/navigation';
import { getNotifications } from '@app/dashboard/notifications/libs/services';
import { UserNotification } from '@app/dashboard/notifications/libs/models';


const { useBreakpoint } = Grid;

interface HeaderProps {
  // Define your props here
}

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showBanner, setShowBanner] = useState(!user?.isVerified);
  const router = useRouter();

  const { data: notifications = [] } = useQuery<UserNotification[]>({
    queryKey: ['NOTIFICATIONS'],
    queryFn: () => getNotifications(),
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const screens = useBreakpoint();

  const handleMenuClick = async ({ key }: { key: string }) => {
    if (key === 'profile') {
      router.push('/profile');
    } else if (key === 'logout') {
      logout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profil
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Çıxış
      </Menu.Item>
    </Menu>
  );



  const notificationMenu = (
    <Menu
      style={{
        width: 320,
        maxHeight: 400,
        overflowY: 'auto',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f0f0f0',
        borderRadius: 6,
      }}
    >
      {notifications.slice(0, 5).map(notification => (
        <Menu.Item
          key={notification.id}
          style={{
            whiteSpace: 'normal',
            padding: '10px 16px',
            marginBottom: '8px',
            backgroundColor: notification.isRead ? '#fff' : '#f0f5ff',
          }}
          onClick={() => router.push('/notifications')}
        >
          <Space align="start" size="small">
            {!notification.isRead && (
              <InfoCircleFilled style={{ color: '#1890ff', fontSize: 14, marginTop: 4 }} />
            )}
            <Text strong={!notification.isRead} style={{ fontSize: 13, lineHeight: 1.4 }}>
              {notification.message}
            </Text>
          </Space>
        </Menu.Item>
      ))}

      {notifications.length > 5 && (
        <>
          <Divider style={{ margin: 0, marginTop: '8px' }} />
          <Menu.Item disabled style={{ textAlign: 'center', padding: '8px 0', cursor: 'default' }}>
            <Button type="link" onClick={() => router.push('/notifications')}>
              Daha çox göstər
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <>
      {showBanner && (
        <div className="bg-red-50 text-lg text-red-700 flex items-center justify-center px-6 z-999 top-0 " style={{ height: 60 }}>
          <span>Hesabınız hələ administrator tərəfindən təsdiqlənməyib.</span>
          <CloseOutlined className="ml-4 text-xl cursor-pointer" onClick={() => setShowBanner(false)} />
        </div>
      )}

      <AntHeader
        style={{
          background: '#fff',
          padding: screens.md ? "0 24px" : "0 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
          position: "sticky",
          top: showBanner ? 48 : 0,
          zIndex: 100,
        }}
      >
        <Title level={screens.md ? 3 : 4} style={{ margin: 0 }}>
          Xoş gəlmisiniz!
        </Title>
        <Space size="large" align="center" style={{ marginRight: 24 }}>
          <div style={{ marginTop: '15px' }}>
            <Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
              <Badge count={unreadCount}>
                <BellOutlined style={{ fontSize: screens.md ? 24 : 20, cursor: "pointer" }} />
              </Badge>
            </Dropdown>
          </div>

          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <div style={{ cursor: 'pointer' }}>
              <Space size="small" align="center">
                <Avatar size={screens.md ? "large" : "middle"} style={{ backgroundColor: "#2f54eb" }}>
                  {user?.fullName?.charAt(0) || 'U'}
                </Avatar>
                <div
                  className="d-md-none"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  {screens.md && <Text strong>{user?.fullName}</Text>}
                  <Text type="secondary" style={{ fontSize: '12px', lineHeight: '1' }}>
                    {/*{USER_ROLE_NAME_MAPPING[user?.role as string]}*/}
                  </Text>
                </div>
              </Space>
            </div>
          </Dropdown>
        </Space>
      </AntHeader>
    </>
  );
};
