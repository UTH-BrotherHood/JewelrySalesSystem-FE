import http from "@/utils/http";

export const fetchRoles = async () => {
  const response = await http.get("/roles");
  return response.data;
};

export const createEmployee = async (data: {
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  roles: string[];
}) => {
  const response = await http.post("/employees", data);
  return response.data;
};

export const fetchEmployee = async (employeeId: string) => {
  const response = await http.get(`/employees/${employeeId}`);
  return response.data;
};

export const updateEmployee = async (
  employeeId: string,
  data: {
    name: string;
    username: string;
    phoneNumber: string;
    roles: string[];
  }
) => {
  const response = await http.put(`/employees/${employeeId}`, data);
  return response.data;
};
