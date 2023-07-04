import axios from "axios";
import Book from "../entities/Book";

const API_URL = "http://localhost:4000/api/books";

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
