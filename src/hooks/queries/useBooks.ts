import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import BooksClient from "../../services/books.service";

const booksClient = new BooksClient("");

const useBooks = (
  page: number,
  limit: number = 10,
  sortBy?: string,
  sortOrder?: string
) =>
  useQuery({
    queryKey: ["books", page, sortBy],
    queryFn: () => booksClient.getBooks(page, limit, sortBy, sortOrder),
    staleTime: ms("12h"),
  });

export default useBooks;
