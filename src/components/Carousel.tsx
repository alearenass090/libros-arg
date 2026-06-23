import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Check } from "lucide-react";
import type { Book } from "../types";
import { useCart } from "../context/CartContext";

interface CarouselProps {
  title: string;
  books: Book[];
  onSelectBook: (book: Book) => void;
}

function CarouselCard({
  book,
  position,
  onSelect,
}: {
  book: Book;
  position: "left" | "center" | "right" | "hidden";
  onSelect: (book: Book) => void;
}) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((item) => item.book.id === book.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(book);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const styles: Record<string, string> = {
    center: "z-20 scale-100 opacity-100 translate-x-0",
    left: "z-10 scale-[0.85] opacity-60 -translate-x-[70%] md:-translate-x-[85%]",
    right: "z-10 scale-[0.85] opacity-60 translate-x-[70%] md:translate-x-[85%]",
    hidden: "z-0 scale-75 opacity-0 translate-x-0",
  };

  return (
    <div
      className={`absolute left-1/2 -ml-[140px] md:-ml-[160px] w-[280px] md:w-[320px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${styles[position]}`}
      onClick={() => position === "center" && onSelect(book)}
    >
      <div
        className={`rounded-2xl overflow-hidden transition-shadow duration-700 ${
          position === "center"
            ? "shadow-[0_20px_60px_-10px_rgba(196,122,42,0.25)]"
            : "shadow-lg"
        }`}
      >
        <div className="relative">
          <img
            src={book.thumbnailLarge}
            alt={book.title}
            className="w-full aspect-[2/3] object-cover"
            draggable={false}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
              position === "center" ? "opacity-100" : "opacity-0"
            }`}
          />

          {position === "center" && (
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-[16px] font-semibold text-white leading-snug mb-1 drop-shadow-lg line-clamp-2">
                {book.title}
              </h3>
              <p className="text-[13px] text-white/70 mb-3 line-clamp-1">
                {book.authors.join(", ")}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[18px] font-bold text-amber-400">
                  ${book.price.toLocaleString("es-AR")}
                </span>
                <button
                  onClick={handleAdd}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                    justAdded
                      ? "bg-emerald-500/90 text-white"
                      : inCart
                      ? "bg-amber-700/80 text-amber-50 hover:bg-amber-600/80"
                      : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
                  }`}
                >
                  {justAdded ? (
                    <><Check className="w-3.5 h-3.5" /> Agregado</>
                  ) : (
                    <><ShoppingCart className="w-3.5 h-3.5" /> {inCart ? "Otro más" : "Agregar"}</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Carousel({ title, books, onSelectBook }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const total = books.length;

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  useEffect(() => {
    if (paused || total <= 1) return;
    intervalRef.current = setInterval(next, 4000);
    return () => clearInterval(intervalRef.current);
  }, [paused, next, total]);

  const getPosition = (index: number): "left" | "center" | "right" | "hidden" => {
    if (index === current) return "center";
    if (index === (current - 1 + total) % total) return "left";
    if (index === (current + 1) % total) return "right";
    return "hidden";
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  if (books.length === 0) return null;

  return (
    <div className="mb-20">
      <h2 className="text-lg font-semibold text-amber-100/90 mb-8 px-6 max-w-6xl mx-auto">{title}</h2>

      <div
        className="relative h-[420px] md:h-[480px] select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {books.map((book, i) => (
            <CarouselCard
              key={book.id}
              book={book}
              position={getPosition(i)}
              onSelect={onSelectBook}
            />
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-amber-900/40 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-amber-200/80" />
        </button>

        <button
          onClick={next}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-amber-900/40 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-amber-200/80" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {books.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-500 cursor-pointer ${
                i === current
                  ? "w-6 h-2 bg-amber-600"
                  : "w-2 h-2 bg-amber-800/30 hover:bg-amber-700/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
