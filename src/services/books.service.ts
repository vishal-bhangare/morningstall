import axios from "axios";
import Book from "../entities/Book";

const API_URL = "https://morningstall-backend.onrender.com/api/books";

const API_URL_LOCAL = "http://localhost:4000/api/books";

const axiosInstance = axios.create({
  baseURL: API_URL_LOCAL,
  headers: {},
});

class BooksClient {
  private endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  addBook = (data: FormData) => {
    return axiosInstance.post(`${API_URL}/add`, data, {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    });
  };
  getAllBooks = (page: number) => {
    return axiosInstance
      .get(`${this.endpoint}/${page}`)
      .then((res) => res.data);
  };
  getBook = (id: string) => {
    return axiosInstance.get(`${this.endpoint}/${id}`).then((res) => res.data);
  };
}

export default BooksClient;
