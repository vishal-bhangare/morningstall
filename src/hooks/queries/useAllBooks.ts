import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import BooksClient from "../../services/books.service";

const booksClient = new BooksClient("");

const useAllBooks = (page: number, limit: number = 10) =>
  useQuery({
    queryKey: ["books", page],
    queryFn: () => booksClient.getAllBooks(page, limit),
    staleTime: ms("12h"),
  });

export default useAllBooks;
