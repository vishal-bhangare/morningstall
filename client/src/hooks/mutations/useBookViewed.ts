import { useMutation } from "@tanstack/react-query";
import BooksClient from "../../services/books.service";

const booksClient = new BooksClient("/book/viewed");

const useBookViewed = () =>
  useMutation({
    mutationFn: (id: string) => booksClient.bookViewed(id),
  });

export default useBookViewed;
