import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import BooksClient from "../../services/books.service";

const booksClient = new BooksClient("/book");

const useBook = (id: string) =>
  useQuery({
    queryKey: ["book", id],
    queryFn: () => booksClient.getBook(id),
    enabled: !!id,
    staleTime: ms("12h"),
  });

export default useBook;
