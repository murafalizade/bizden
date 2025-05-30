import api from '@/shared/libs/service';
import { DiscountFilterDto, DiscountOffer } from './models';

export const getDiscounts = async (
  filters: DiscountFilterDto
): Promise<{ discounts: DiscountOffer[]; hasMore: boolean }> => {
  const response = await api.post('/discount/find', filters);

  // Manually calculate hasMore based on whether fewer than maxCount results were returned
  const discounts = response.data as DiscountOffer[];
  const hasMore = discounts.length === filters.maxCount;
  
  return { discounts, hasMore };
};

export const getUserImage = async (fileName: string): Promise<Blob> => {
  const { data } = await api.get(`/File/download/${fileName}`, {
    responseType: 'blob',
  });

  return data;
};

export const applyDiscount = async (discountId: string): Promise<void> => {
  const {data} = await api.post('/offer', { discountId });
  return data;
};
