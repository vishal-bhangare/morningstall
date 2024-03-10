import { useQuery } from "@tanstack/react-query";
import BooksClient from "../../services/books.service";
import ms from "ms";

const booksClient = new BooksClient("/filters");

const useFilters = () =>
  useQuery({
    queryKey: ["filters"],
    queryFn: () => booksClient.getFilters(),
    staleTime: ms("24h"),
  });
export default useFilters;
