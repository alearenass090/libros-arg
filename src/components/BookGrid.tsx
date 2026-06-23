import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { BookCard } from "./BookCard";
import { searchBooks, searchByQuery } from "../services/bookApi";
import { allCategories, WHATSAPP_NUMBER } from "../data/categories";
import type { Book } from "../types";

interface BookGridProps {
  categoryId: string;
  searchQuery: string;
  onSelectBook: (book: Book) => void;
}

const PER_PAGE = 24;

export function BookGrid({ categoryId, searchQuery, onSelectBook }: BookGridProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [categoryId, searchQuery]);

  const isSearch = searchQuery.length > 0;
  const offset = (page - 1) * PER_PAGE;

  const { books, total } = isSearch
    ? searchByQuery(searchQuery, PER_PAGE, offset)
    : searchBooks(categoryId, PER_PAGE, offset);

  const title = isSearch
    ? `Resultados para "${searchQuery}"`
    : allCategories.find((c) => c.id === categoryId)?.name ?? "";

  const totalPages = Math.ceil(total / PER_PAGE);

  const scrollToGrid = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToPage = (p: number) => {
    setPage(p);
    scrollToGrid();
  };

  const pageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section id="catalogo" className="pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-amber-100/90">{title}</h2>
          {total > 0 && (
            <span className="text-[12px] text-stone-600">
              {total.toLocaleString("es-AR")} libros
            </span>
          )}
        </div>

        {books.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[15px] text-stone-400 mb-2">
              No encontramos lo que buscás en nuestro catálogo.
            </p>
            <p className="text-[13px] text-stone-600 mb-6">
              Consultanos por WhatsApp y te lo conseguimos.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, estoy buscando "${searchQuery}" y no lo encontré en el catálogo. ¿Lo tienen disponible?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-700 text-amber-50 text-[13px] font-medium rounded-lg hover:bg-amber-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar por WhatsApp
            </a>
          </div>
        )}

        {books.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
              {books.map((book) => (
                <BookCard key={book.id} book={book} onSelect={onSelectBook} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-12">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-amber-900/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-stone-400" />
                </button>

                {pageNumbers().map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="px-2 text-[12px] text-stone-600">...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                        page === p
                          ? "bg-amber-700 text-amber-50"
                          : "text-stone-500 hover:bg-amber-900/20 hover:text-amber-200/70"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg hover:bg-amber-900/20 transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
