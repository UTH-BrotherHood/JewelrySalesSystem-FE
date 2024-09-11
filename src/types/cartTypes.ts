export interface CartItem {
  itemId: string;
  productId: string;
  quantity: number;
  price: number;
  productName?: string;
  productImageUrl?: string;
}

export interface CartResponse {
  result: any;
  cartId: string;
  employeeId: string;
  items: CartItem[];
  totalAmount: number;
}

export interface Promotion {
  result: any;
  promotionCode: string;
  name: string;
  discountPercentage: number;
}
