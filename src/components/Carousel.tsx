import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Check } from "lucide-react";
import type { Book } from "../types";
import { useCart } from "../context/CartContext";
import { BookCover } from "./BookCover";

interface CarouselProps {
  title: string;
  books: Book[];
  onSelectBook: (book: Book) => void;
}

function CarouselCard({ book, onSelect }: { book: Book; onSelect: (book: Book) => void }) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((item) => item.book.id === book.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(book);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] cursor-pointer group"
      onClick={() => onSelect(book)}
    >
      <div className="relative rounded-xl overflow-hidden mb-3">
        <BookCover src={book.thumbnail} alt={book.title} className="aspect-[2/3] rounded-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleAdd}
          className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all opacity-0 group-hover:opacity-100 cursor-pointer ${
            justAdded
              ? "bg-emerald-500/90 text-white"
              : "bg-black/50 text-white hover:bg-amber-800/70 backdrop-blur-sm"
          }`}
        >
          {justAdded ? (
            <><Check className="w-3 h-3" /> Listo</>
          ) : (
            <><ShoppingCart className="w-3 h-3" /> {inCart ? "Otro" : "Agregar"}</>
          )}
        </button>
      </div>

      <h3 className="text-[13px] font-medium text-amber-100/80 leading-snug line-clamp-2 mb-0.5">
        {book.title}
      </h3>
      <p className="text-[11px] text-stone-600 line-clamp-1 mb-1">
        {book.authors.join(", ")}
      </p>
      <span className="text-[13px] font-semibold text-amber-600">
        ${book.price.toLocaleString("es-AR")}
      </span>
    </div>
  );
}

export function Carousel({ title, books, onSelectBook }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const looped = useMemo(() => [...books, ...books, ...books], [books]);

  const getSetWidth = useCallback(() => {
    if (!scrollRef.current || books.length === 0) return 0;
    const child = scrollRef.current.children[0] as HTMLElement | undefined;
    if (!child) return 0;
    const gap = 16;
    return (child.offsetWidth + gap) * books.length;
  }, [books.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const setW = getSetWidth();
      if (setW > 0) el.scrollLeft = setW;
    });
  }, [getSetWidth]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isDragging.current) return;
    const setW = getSetWidth();
    if (setW === 0) return;
    if (el.scrollLeft < setW * 0.3) {
      el.scrollLeft += setW;
    } else if (el.scrollLeft > setW * 1.7) {
      el.scrollLeft -= setW;
    }
  }, [getSetWidth]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      if (scrollRef.current) scrollRef.current.style.cursor = "grab";
      handleScroll();
    }
  };

  if (books.length === 0) return null;

  return (
    <div className="mb-14">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-amber-100/90">{title}</h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-full bg-amber-900/10 flex items-center justify-center hover:bg-amber-900/25 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-stone-400" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-full bg-amber-900/10 flex items-center justify-center hover:bg-amber-900/25 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-6 md:px-[calc((100vw-72rem)/2+1.5rem)] cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {looped.map((book, i) => (
          <CarouselCard key={`${book.id}-${i}`} book={book} onSelect={onSelectBook} />
        ))}
      </div>
    </div>
  );
}
