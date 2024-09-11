export interface Role {
  name: string;
  description: string;
  permissions: string[]; // Hoặc kiểu khác tùy theo dữ liệu thực tế
}

export interface Customer {
  customerId: string;
  customername: string; // Sửa thành camelCase
  email: string;
  address: string;
  phone: string;
  rewardPoints: number;
  roles: Role[]; // Mảng các role
  rankLevel: string;
  createdAt: string;
  updatedAt: string;
}
export interface CustomerRespone {
  code: number;
  result: Customer;
}
