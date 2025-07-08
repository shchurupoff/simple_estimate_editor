export type EstimateItem = {
  id: string;
  name: string;
  pricePerUnit: number;
  quantity: number;
  totalPrice: number;
};

export type Estimate = {
  id: string;
  items: EstimateItem[];
  totalSum: number;
};
