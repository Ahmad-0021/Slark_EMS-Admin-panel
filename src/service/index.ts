/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import

const url = "http://localhost:3001";

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${url}/auth/login`, data);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchAdmin = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return;
  }
  const decodedToken = jwtDecode<{ id: string }>(token);
  const id = decodedToken.id;
  const response = await axios.get(`${url}/admin/user?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data.user;
};

export const fetchAllUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return [];
  }
  try {
    const response = await axios.get(`${url}/admin/all-users?page=1&limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    });
   
    return response.data.data.users || [];
  } catch (error: any) {
    console.error("Fetch users error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchAllInvoices = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return [];
  }
  try {
    const { data } = await axios.get(`${url}/invoices`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.invoice || [];
  } catch (error: any) {
    console.error(
      "Fetch invoices error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
