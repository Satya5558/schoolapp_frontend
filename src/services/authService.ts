import { HOST } from "../constants";
import { Credentials } from "../types/authTypes";
import axiosInstance from "./axiosInstance";

export function authenticateUser(credentials: Credentials) {
  const response = axiosInstance.post(`${HOST}api/auth/admin`, credentials);
  return response;
}

export const authenticateSchool = async (credentials: Credentials) => {
  return await axiosInstance.post(`${HOST}api/auth/school`, credentials);
};
