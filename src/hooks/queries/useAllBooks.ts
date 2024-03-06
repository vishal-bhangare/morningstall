import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import BooksClient from "../../services/books.service";

const booksClient = new BooksClient("");

const useAllBooks = (page: number) =>
  useQuery({
    queryKey: ["books"],
    queryFn: () => booksClient.getAllBooks(page),
    staleTime: ms("12h"),
  });

export default useAllBooks;
