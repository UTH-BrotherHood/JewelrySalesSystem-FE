// salesOrderTypes.ts

export interface SalesOrderResponse {
  salesOrderId: string;
  customerId: string;
  employeeId: string;
  cartId: string;
  promotionCode: string;
  paymentMethodId: string;
  orderDate: string; // ISO format for date
  totalAmount: number;
  status: string; // E.g., "Pending", "Completed", etc.
  createdAt: string;
  updatedAt: string;
  items: SalesOrderItem[]; // List of items in the sales order
}

export interface SalesOrderItem {
  itemId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateSalesOrderRequest {
  customerId: string;
  employeeId: string;
  cartId: string;
  promotionCode: string;
  paymentMethodId: string;
}
