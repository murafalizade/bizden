import {
  GiftOutlined,
  HomeOutlined,
  UserOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { MenuItemType } from 'antd/es/menu/interface';
import { UserRole } from '@shared/libs/models';
import Link from 'next/link';

export const sidebarItems: Array<MenuItemType & { accessRoles: UserRole[]; path: string }> = [
  {
    key: 'dashboard',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />,
    label: <Link href="/dashboard">Əsas Səhifə</Link>,
    path: '/dashboard',
    accessRoles: [UserRole.Student, UserRole.Veteran, UserRole.Business],
  },
  {
    key: 'search',
    icon: <SearchOutlined style={{ fontSize: '24px' }} />,
    label: <Link href="/dashboard/search">Axtar</Link>,
    path: '/dashboard/search',
    accessRoles: [UserRole.Student, UserRole.Veteran, UserRole.Business],
  },
  {
    key: 'create',
    icon: <PlusCircleOutlined style={{ fontSize: '24px' }} />,
    path: '/dashboard/create-opportunity',
    label: <Link href="/dashboard/create-opportunity">Yeni Təklif</Link>,
    accessRoles: [UserRole.Business],
  },
  {
    key: 'my-offers',
    icon: <GiftOutlined style={{ fontSize: '24px' }} />,
    path: '/dashboard/opportunities',
    label: <Link href="/dashboard/opportunities">Müraciətlərim</Link>,
    accessRoles: [UserRole.Student, UserRole.Veteran],
  },
  {
    key: 'my-discounts',
    icon: <GiftOutlined style={{ fontSize: '24px' }} />,
    path: '/dashboard/applications',
    label: <Link href="/dashboard/applications">Təkliflərim</Link>,
    accessRoles: [UserRole.Business],
  },
  {
    key: 'profile',
    icon: <UserOutlined style={{ fontSize: '24px' }} />,
    path: '/dashboard/profile',
    label: <Link href="/dashboard/profile">Hesab</Link>,
    accessRoles: [UserRole.Student, UserRole.Veteran, UserRole.Business],
  },
];
