import React from 'react';
import { Result } from 'antd';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="404"
        subTitle="Axtardığınız səhifə mövcud deyil."
        extra={<Link href={'/'}>Ana səhifəyə qayıt</Link>}
      />
    </div>
  );
};

export default NotFoundPage;
