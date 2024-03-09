import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import BooksClient from "../../services/books.service";
import { FiltersI } from "../../components/BooksListing/BooksListing";

const booksClient = new BooksClient("");

const useBooks = (page: number, limit: number = 10, filters: FiltersI) =>
  useQuery({
    queryKey: ["books", page, filters],
    queryFn: () => booksClient.getBooks(page, limit, filters),
    staleTime: ms("12h"),
  });

export default useBooks;
