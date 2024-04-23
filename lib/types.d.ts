export type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

export type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [string];
  tags: [string];
  price: number;
  cost: number;
  sizes: [string];
  colors: [string];
  createdAt: string;
  updatedAt: string;
};

export type UserType = {
  clerkId: string;
  wishlist: [string];
  createdAt: string;
  updatedAt: string;
};

export type OrderType = {
  shippingAddress: Object;
  _id: string;
  customerClerkId: string;
  products: [OrderItemType];
  shippingRate: string;
  totalAmount: number;
};

export type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
  _id: string;
};
