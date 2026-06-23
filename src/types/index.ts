export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  thumbnailLarge: string;
  pageCount: number;
  categories: string[];
  price: number;
  year: number;
  publisher: string;
  isbn: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  query: string;
}
