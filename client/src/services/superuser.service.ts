import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
import { FieldValues } from "react-hook-form";

export function login(data: FieldValues) {
  return axios.post(`${API_URL}/superuser/login`, data);
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export function createAdmin(data: FieldValues) {
  return axios.post(`${API_URL}/superuser/new/admin`, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}
