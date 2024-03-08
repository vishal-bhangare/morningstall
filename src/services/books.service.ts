import axios from "axios";

// const API_URL = "https://morningstall-backend.onrender.com/api/books";

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
    return axiosInstance.post(`${this.endpoint}`, data, {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    });
  };

  getBooks = (
    page: number,
    limit: number = 10,
    sortBy?: string,
    sortOrder?: string
  ) => {
    return axiosInstance
      .get(
        `${this.endpoint}/${page}?limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      )
      .then((res) => res.data);
  };

  getBook = (id: string) => {
    return axiosInstance.get(`${this.endpoint}/${id}`).then((res) => res.data);
  };

  bookViewed = (id: string) => {
    return axiosInstance
      .patch(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

export default BooksClient;
