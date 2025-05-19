import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import type { MenuProps } from 'antd';
import { ReactQueryProvider } from '@/shared/components/ReactQueryClient';
import { SECTIONS } from '@/app/libs/constants';

export const metadata: Metadata = {
  title: 'BIZDƏN – Tələbələr, veteranlar və şəhid ailələri üçün endirimlər',
  description:
    'BIZDƏN tələbələr, veteranlar və şəhid ailələri üçün endirimlər və pulsuz fürsətlər təqdim edən platformadır.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menuItems: MenuProps['items'] = SECTIONS.map(s => ({
    key: s.key,
    label: <Link href={`/#${s.key}`}>{s.label}</Link>,
  }));

  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Layout className="min-h-screen bg-gray-100">
            <Header className="fixed top-0 w-full z-50 px-10 bg-[#001529]">
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[]}
                className="!hidden md:!flex justify-center bg-transparent"
                items={menuItems}
              />
            </Header>
            <Content className="pt-16">{children}</Content>
          </Layout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
