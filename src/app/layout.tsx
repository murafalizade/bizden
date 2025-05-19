import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import {Layout, Menu} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import type { MenuProps } from 'antd'

export const metadata: Metadata = {
  title: 'Bizdən',
  description: 'Platform for students and veterans',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sections = [
    { key: 'about', label: 'Haqqımızda' },
    { key: 'vision', label: 'Vizyonumuz' },
    { key: 'how', label: 'Necə işləyir?' },
    { key: 'contact', label: 'Əlaqə' },
  ]

  const menuItems: MenuProps['items'] = sections.map((s) => ({
    key: s.key,
    label: <Link href={`/#${s.key}`}>{s.label}</Link>,
  }))

  return (
    <html lang="en">
      <body>
        <Layout className="min-h-screen bg-gray-100">
          <Header className="fixed top-0 w-full z-50 px-10">
            <Menu
              theme="dark"
              mode="horizontal"
              className="flex justify-center bg-transparent"
              items={menuItems}
            />
          </Header>

          <Content className="pt-16">
            {children}
          </Content>
        </Layout>
      </body>
    </html>
  )
}
