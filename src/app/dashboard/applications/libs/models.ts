export interface IApplication {
  id: string;
  status: number;
  discount: any;
}

export interface IApplicationFilter {
  offset: number;
  maxCount: number;
}
