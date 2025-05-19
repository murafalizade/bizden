'use client';
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import Link from 'next/link';

const { Title, Text } = Typography;

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 ">
      <div className="p-8 rounded-lg bg-white shadow-md w-full max-w-md text-center">
        <Title level={2} className="text-blue-600 mb-4">
          BIZDƏN!
        </Title>
        <Text className="block mb-6 text-gray-600">
          Xoş gəldiniz! Zəhmət olmasa, hesabınıza daxil olun.
        </Text>

        <Form name="login" layout="vertical" size="large">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Emailinizi daxil edin!' },
              { type: 'email', message: 'Düzgün email formatı deyil' },
            ]}
          >
            <Input placeholder="Emailinizi daxil edin" />
          </Form.Item>

          <Form.Item
            label="Şifrə"
            name="password"
            rules={[{ required: true, message: 'Şifrənizi daxil edin!' }]}
          >
            <Input.Password placeholder="Şifrənizi daxil edin" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Daxil ol
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Şifrəni unutmusunuz?
          </Link>
        </div>

        <div className="mt-2 text-sm">
          <Text>
            Hesabınız yoxdur?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Qeydiyyatdan keçin
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
