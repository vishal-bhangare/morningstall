import axios from "axios";
import { FiltersI } from "../components/BooksListing/BooksListing";

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

  getBooks = (page: number, limit: number = 10, filters?: FiltersI) => {
    const filterArr = Object.entries(filters!);
    let filterStr = "";

    filterArr.forEach((filter) => {
      if (!!filter[1].length && typeof filter[1] !== "string") {
        filter[1].forEach((filterValue: string, i: number) => {
          filterStr += `&${i ? `${filter[0]}${i}` : filter[0]}=${filterValue}`;
        });
      } else if (!!filter[1] && typeof filter[1] === "string") {
        filterStr += `&${filter[0]}=${filter[1]}`;
      }
    });

    return axiosInstance
      .get(`${this.endpoint}/${page}?limit=${limit}${filterStr}`)
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

  getFilters = () => {
    return axiosInstance.get(`${this.endpoint}`).then((res) => res.data);
  };
}

export default BooksClient;
