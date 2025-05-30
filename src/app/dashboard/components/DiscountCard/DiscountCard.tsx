"use client";

import { Button, Tag, Typography, Image } from "antd";
import { ClockCircleOutlined, EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { DiscountOffer } from "../../libs/models";
import { USER_ROLE_NAME_MAPPING } from "@/shared/constants";
import { useAuth } from "@/shared/hooks/useAuth";
import { applyDiscount, getUserImage } from "../../libs/services";
import { useRouter } from "next/navigation";

const Text = Typography.Text;

interface DiscountCardProps {
  offer: DiscountOffer;
}

export const DiscountCard: React.FC<DiscountCardProps> = ({ offer }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState<boolean>(false);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await applyDiscount(offer.id);
      router.push('/opportunities');
    } catch (error) {
      console.error('Failed to apply for discount:', error);
    } finally {
      setIsApplying(false);
    }
  };


  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (offer.business.profileImage) {
          const blob = await getUserImage(offer.business.profileImage); // already returns Blob
          setAvatarUrl(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error("Error fetching business image:", error);
      }
    };


    fetchImage();

    return () => {
      if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    };
  }, [offer.business.profileImage]);

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0">
          <Image
            src={avatarUrl || "/default-business.jpg"}
            alt="Business logo"
            width={80}
            height={80}
            className="rounded-lg border p-1 bg-white object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
            <h4 className="text-lg font-semibold m-0">
              <Link href={`/profile/company/${offer.business.id}`} className="text-blue-600 hover:underline">
                {offer.business.name}
              </Link>
            </h4>

            <div className="flex flex-wrap gap-2 items-center">
              {offer.isFree ? (
                <Tag color="green" className="font-semibold">Ödənişsiz</Tag>
              ) : (
                <Tag color="red" className="font-semibold">
                  %{offer.percentage} Endirim
                </Tag>
              )}

              <Tag icon={<ClockCircleOutlined />} color="orange">
                Bitmə tarixi: {dayjs(offer.expiredDate).format("DD MMM YYYY")}
              </Tag>

              {offer.targetUserTypes?.map((tag) => (
                <Tag
                  color={tag === "Student" ? "blue" : "green"}
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded"
                >
                  {USER_ROLE_NAME_MAPPING[tag]}
                </Tag>
              ))}

              <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                <UserOutlined className="mr-1 text-blue-500" />
                {offer.appliedCount} / {offer.maxCount}
              </div>
            </div>
          </div>

          <p className="my-2 text-gray-700">{offer.description}</p>

          <div className="flex flex-wrap justify-between items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-gray-600">
              <EnvironmentOutlined className="text-blue-500" />
              <Text>{offer.business.city}</Text>
            </div>

            {offer.isAlreadyApplied ? (
              <p className="text-red-600 font-semibold m-0">Siz artıq müraciət etmisiniz!</p>
            ) : (
              <Button
                type="primary"
                size="middle"
                disabled={user?.role === "Business"}
                loading={isApplying} // 🔁 loading spinner
                onClick={handleApply}
              >
                Müraciət et
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};