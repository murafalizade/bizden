export interface IFilterPayload {
  category?: string;
  city?: string;
  isFree?: boolean;
  searchText?: string;
  type?: number;
  targetUserTypes?: string[];
}

export interface IPaginationModel {
  maxCount: number;
  offset: number;
}
