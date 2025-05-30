'use client'

import { useEffect, useRef, useState } from 'react';
import { DiscountFilterDto, DiscountOffer } from '../../libs/models';
import { DiscountCard } from '../DiscountCard';
import { Button } from 'antd';
import { getDiscounts } from '../../libs/services';


interface DiscountsListProps {
  // Define your props here
}

const PAGE_SIZE = 5;

export const DiscountsList: React.FC<DiscountsListProps> = (props) => {
  const [discounts, setDiscounts] = useState<DiscountOffer[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const didFetchRef = useRef(false);

  const fetchMore = async () => {
    setIsLoading(true);

    const filters: DiscountFilterDto = {
      maxCount: PAGE_SIZE,
      offset,
    };

    try {
      const { discounts: newDiscounts, hasMore: more } = await getDiscounts(filters);
      setDiscounts((prev) => [...prev, ...newDiscounts]);
      setOffset((prev) => prev + PAGE_SIZE);
      setHasMore(more);
    } catch (err) {
      console.error('Error fetching discounts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    fetchMore();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {discounts.map(offer => (
          <DiscountCard key={offer.id} offer={offer} />
        ))}
      </div>

      {discounts.length > 0 && hasMore && (
        <Button
          type="primary"
          size="large"
          loading={isLoading}
          onClick={fetchMore}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Daha çox yüklə
        </Button>
      )}

    </div>
  );
};
