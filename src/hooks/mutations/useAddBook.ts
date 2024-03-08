import { useMutation } from "@tanstack/react-query";
import Book from "../../entities/Book";
import BooksClient from "../../services/books.service";

const booksClient = new BooksClient("/");

const useAddBook = () =>
  useMutation({
    mutationFn: (newBook: FormData) => booksClient.addBook(newBook),
  });

export default useAddBook;
