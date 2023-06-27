import axios from "axios";
const API_URL = "http://localhost:4000/api";
import { FieldValues } from "react-hook-form";

export function login(data: FieldValues) {
  return axios.post(`${API_URL}/superuser/login`, data);
}
