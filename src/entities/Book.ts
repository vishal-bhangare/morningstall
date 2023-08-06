export default interface Book {
  _id: string;
  name: string;
  author: string;
  publication: string;
  publicationYear: number;
  isbn: string;
  language: string;
  genre: string;
  edition: string;
  pdf: string;
  coverPage: string;
  views: number;
  favorite: number;
  likes: number;
  rating: number;
  about: string;
  pages: string;
  added_by: string;
  added_on: string;
  tags: string[];
}
