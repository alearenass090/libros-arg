import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Book } from "../types";
import { useCart } from "../context/CartContext";
import { BookCover } from "./BookCover";

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

export function BookCard({ book, onSelect }: BookCardProps) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((item) => item.book.id === book.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(book);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const smallThumb = book.thumbnail.replace("-M.jpg", "-S.jpg");

  return (
    <div className="group cursor-pointer" onClick={() => onSelect(book)}>
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
        <BookCover src={smallThumb} alt={book.title} className="aspect-[2/3] rounded-lg" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleAdd}
          className={`absolute bottom-2 right-2 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer ${
            justAdded
              ? "bg-emerald-700/90 text-emerald-50"
              : "bg-stone-900/80 text-stone-200 hover:bg-amber-900/70"
          }`}
        >
          {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      <h3 className="text-[13px] font-medium text-amber-100/80 leading-snug line-clamp-2 mb-0.5">
        {book.title}
      </h3>
      <p className="text-[12px] text-stone-600 line-clamp-1 mb-1">
        {book.authors.join(", ")}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-amber-600">
          ${book.price.toLocaleString("es-AR")}
        </span>
        {inCart && !justAdded && (
          <span className="text-[11px] text-stone-600">En carrito</span>
        )}
      </div>
    </div>
  );
}
