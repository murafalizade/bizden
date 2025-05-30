import { Tag, Tooltip } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import Link from 'next/link';
import { applicationStatusMapper } from '@app/dashboard/applications/libs/appliction-status-mapper';
import { IApplication } from '@app/dashboard/applications/libs/models';

interface ApplicationCardProps {
  offer: IApplication;
  avatarUrl?: string;
}

export const ApplicationCard = ({ offer, avatarUrl }: ApplicationCardProps) => {
  const {
    id,
    status,
    discount: { description, expiredDate, isFree, percentage, appliedCount, maxCount, business },
  } = offer;

  return (
    <div
      key={id}
      className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl || undefined}
            className="w-20 h-20 object-contain rounded-full border border-gray-300 p-1 bg-white"
            alt="business avatar"
          />
          <Link
            href={`/profile/company/${business?.id}`}
            className="text-lg font-semibold text-black hover:underline"
          >
            {business?.name}
          </Link>
        </div>
        <div className="mt-2 md:mt-0 text-gray-700">
          <p className="mb-2">{description}</p>
          <div className="flex flex-wrap gap-2">
            <Tag color="blue">{business?.category}</Tag>
            <Tag color="default">{isFree ? 'Pulsuz təklif' : `${percentage}% endirim`}</Tag>
            <Tag icon={<ClockCircleOutlined />} color="orange">
              Bitmə tarixi: {dayjs(expiredDate).format('DD MMM YYYY')}
            </Tag>
            <Tag color="purple">
              {appliedCount}/{maxCount} istifadə olunub
            </Tag>
            <Tag icon={<EnvironmentOutlined />} color="cyan">
              {business?.city}, {business?.location}
            </Tag>
            <Tooltip title={business?.phoneNumber}>
              <Tag icon={<PhoneOutlined />} color="gold">
                Əlaqə
              </Tag>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:text-right">
        <Tag
          icon={
            status === 1 ? (
              <CheckCircleOutlined />
            ) : status === 2 ? (
              <CloseCircleOutlined />
            ) : (
              <ClockCircleOutlined />
            )
          }
          color={status === 1 ? 'green' : status === 2 ? 'red' : 'geekblue'}
          style={{ fontSize: 14, padding: '6px 12px', borderRadius: 20 }}
        >
          {applicationStatusMapper[status]}
        </Tag>
      </div>
    </div>
  );
};
