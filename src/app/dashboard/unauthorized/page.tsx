import React from 'react';
import { Result } from 'antd';
import Link from 'next/link';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Result
        status="403"
        subTitle="Bu səhifəyə giriş icazəniz yoxdur."
        extra={<Link href={'/'}>Ana səhifəyə qayıt</Link>}
      />
    </div>
  );
};

export default UnauthorizedPage;
