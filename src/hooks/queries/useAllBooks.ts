import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import BooksClient from "../../services/books.service";
import Book from "../../entities/Book";

const booksClient = new BooksClient<Book[]>("/");

const useAllBooks = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: () => booksClient.getAllBooks(),
    staleTime: ms("12h"),
  });

export default useAllBooks;
