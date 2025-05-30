import { BusinessProfile } from "@/shared/libs/models";

export interface DiscountOffer {
  id: string;
  business: BusinessProfile;
  
  description: string;
  maxCount: number;
  appliedCount: number;
  targetUserTypes: string[];
  location: string;
  isFree: boolean;
  expiredDate: string;
  percentage: number;
  isAlreadyApplied: boolean;
}


export interface DiscountFilterDto {
    category?: string;
    city?: string;
    isFree?: boolean;
    searchText?: string;
    type?: number;
    targetUserTypes?: string[];
    maxCount: number;
    offset: number;
}