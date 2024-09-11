
'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from "js-cookie"; // Adjust the import path
import { useAppDispatch } from '@/lib/hooks'; // Assuming you're using Redux for dispatching
import { setEmployeeInfo } from '@/lib/slices/employeeSlice';

interface Employee {
    username: string;
    email: string;
    avatar: string;
    date_of_birth: string;
    id: string;
    phone_number: string | null;
    total_cart_quantity: number;
    total_wishlist_quantity: number;
    created_at: string;
    updated_at: string;
    verify: string;
}

interface EmployeeContextProps {
    employee: Employee | null;
    setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

export const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

interface EmployeeProviderProps {
    children: ReactNode;
}

export const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const dispatch = useAppDispatch();

   
    const fetchEmployeeInfo = async () => {
        const token = Cookies.get("token");
        if (token) {
            const config = {
                baseURL: 'http://localhost:8080/jewelry/v1',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                // Fetch employee info
                const response = await axios.get("/employees/myInfo", config);
                
                setEmployee(response.data.result);

                // Update Redux state
                dispatch(setEmployeeInfo(response.data.result));
            } catch (error) {
                console.error('Error fetching employee info:', error);
                setEmployee(null);
            }
        }
    };

    useEffect(() => {
        fetchEmployeeInfo();
    }, []);

    return (
        <EmployeeContext.Provider value={{ employee, setEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};
