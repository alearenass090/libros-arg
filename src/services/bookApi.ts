import type { Book } from "../types";
import booksDb from "../data/books.json";
import popularesData from "../data/featured-populares.json";
import seleccionData from "../data/featured-seleccion.json";

type RawBook = Omit<Book, "description"> & { description?: string };
const raw = booksDb as unknown as Record<string, RawBook[]>;

const db: Record<string, Book[]> = {};
for (const [cat, books] of Object.entries(raw)) {
  db[cat] = books.map((b) => ({
    ...b,
    description: b.description ?? "",
    authors: Array.isArray(b.authors) ? b.authors : [String(b.authors || "Autor desconocido")],
    categories: Array.isArray(b.categories) ? b.categories : [],
    price: 1000,
  }));
}

export interface SearchResult {
  books: Book[];
  total: number;
}

export function searchBooks(categoryId: string, limit = 24, offset = 0): SearchResult {
  const books = db[categoryId] ?? [];
  return {
    books: books.slice(offset, offset + limit),
    total: books.length,
  };
}

export function searchByQuery(query: string, limit = 24, offset = 0): SearchResult {
  const q = query.toLowerCase();
  const allBooks: Book[] = [];
  const seen = new Set<string>();

  for (const catBooks of Object.values(db)) {
    for (const book of catBooks) {
      if (seen.has(book.id)) continue;
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchAuthor = book.authors.some((a) => a.toLowerCase().includes(q));
      if (matchTitle || matchAuthor) {
        seen.add(book.id);
        allBooks.push(book);
      }
    }
  }

  return {
    books: allBooks.slice(offset, offset + limit),
    total: allBooks.length,
  };
}

function normalizeBooks(raw: unknown[]): Book[] {
  return (raw as RawBook[]).map((b) => ({
    ...b,
    description: b.description ?? "",
    authors: Array.isArray(b.authors) ? b.authors : [String(b.authors || "Autor desconocido")],
    categories: Array.isArray(b.categories) ? b.categories : [],
    price: 1000,
  }));
}

const featuredPopulares = normalizeBooks(popularesData as unknown[]);
const featuredSeleccion = normalizeBooks(seleccionData as unknown[]);

export function getFeatured(query: string, limit = 10): Book[] {
  const books = query === "populares" ? featuredPopulares : featuredSeleccion;
  return books.slice(0, limit);
}

export async function getBookDetail(key: string): Promise<{ description: string }> {
  const url = `https://openlibrary.org${key}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return { description: "" };
    const data = await res.json();
    const desc = typeof data.description === "string"
      ? data.description
      : data.description?.value ?? "";
    return { description: desc };
  } catch {
    return { description: "" };
  }
}
