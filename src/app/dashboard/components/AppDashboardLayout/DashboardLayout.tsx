import { Grid, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { Sidebar } from '@app/dashboard/components/Sidebar';
import { Header } from '@app/dashboard/components/Header';
import { Content } from 'antd/es/layout/layout';
import { BottomNavigation } from '@app/dashboard/components/BottomNavigation';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const { useBreakpoint } = Grid;

export const AppDashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

  const screens = useBreakpoint();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="md"
        collapsedWidth={0}
        width={280}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <Sidebar />
      </Sider>

      <Layout
        style={{
          marginLeft: screens.md ? 280 : 0,
          transition: "margin-left 0.3s",
        }}
        className="app-content"
      >
        <Header />
        <Content
          style={{
            margin: "24px",
            padding: "24px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {children}
          </div>
        </Content>
      </Layout>

      <BottomNavigation />
    </Layout>
  );
};
