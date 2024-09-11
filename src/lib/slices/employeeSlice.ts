import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  employeeId: string | null;
  username: string | null;
  avatar: string | null;
  dateOfBirth: string | null;
  phoneNumber: string | null;
  totalCartQuantity: number | null;
  totalWishlistQuantity: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  verify: string | null;
}

const initialState: EmployeeState = {
  employeeId: null,
  username: null,
  avatar: null,
  dateOfBirth: null,
  phoneNumber: null,
  totalCartQuantity: null,
  totalWishlistQuantity: null,
  createdAt: null,
  updatedAt: null,
  verify: null,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeInfo: (state, action: PayloadAction<EmployeeState>) => {
      
      return { ...state, ...action.payload };
    },
    setEmployeeId: (state, action: PayloadAction<string>) => {
      state.employeeId = action.payload;
    },
  },
});

export const { setEmployeeInfo, setEmployeeId } = employeeSlice.actions;
export default employeeSlice.reducer;
