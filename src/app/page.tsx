import { MainSection } from '@/app/components/MainSection';
import { AboutSection } from '@/app/components/AboutSection';
import { VisionSection } from '@/app/components/VisionSection';
import { HowSection } from '@/app/components/HowSection';
import { ContactSection } from '@/app/components/ContactSection';
import {Layout, Menu, type MenuProps} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import React from "react";
import {SECTIONS} from "@app/libs/constants";
import Link from "next/link";

export default function Home() {
    const menuItems: MenuProps['items'] = SECTIONS.map(s => ({
        key: s.key,
        label: <Link href={`/#${s.key}`}>{s.label}</Link>,
    }));

  return (
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
          <Content className="pt-16">
                  <MainSection />
                  <AboutSection />
                  <VisionSection />
                  <HowSection />
                  <ContactSection />
          </Content>
      </Layout>
  );
}
