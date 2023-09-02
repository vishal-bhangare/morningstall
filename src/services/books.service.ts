import axios from "axios";
import Book from "../entities/Book";

const API_URL = "https://morningstall-backend.onrender.com/api/books";

export function addBook(data: FormData) {
  return axios.post(`${API_URL}/add`, data, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });
}

export function getAllBooks() {
  return axios.get(`${API_URL}/`);
}
export function getBookInfo(id: string) {
  return axios.get(`${API_URL}/${id}`);
}
