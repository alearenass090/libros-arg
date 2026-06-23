import { X, ShoppingCart, Check, FileText, BookOpen, Calendar, Hash, Building } from "lucide-react";
import { useState, useEffect } from "react";
import type { Book } from "../types";
import { useCart } from "../context/CartContext";
import { getBookDetail } from "../services/bookApi";
import { FORMATS } from "../data/categories";

interface BookDetailProps {
  book: Book | null;
  onClose: () => void;
}

export function BookDetail({ book, onClose }: BookDetailProps) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [description, setDescription] = useState("");
  const [loadingDesc, setLoadingDesc] = useState(false);

  const inCart = book ? items.some((item) => item.book.id === book.id) : false;

  useEffect(() => {
    if (!book) return;
    setDescription("");
    setLoadingDesc(true);
    getBookDetail(book.id)
      .then((data) => setDescription(data.description))
      .finally(() => setLoadingDesc(false));
  }, [book]);

  useEffect(() => {
    if (!book) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [book, onClose]);

  if (!book) return null;

  const handleAdd = () => {
    addToCart(book);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#110d08] border border-amber-900/12 rounded-2xl pointer-events-auto fade-up"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-amber-900/15 transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4 text-stone-500" />
          </button>

          <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={book.thumbnailLarge}
                alt={book.title}
                className="w-48 md:w-56 rounded-lg shadow-2xl"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-amber-100/90 font-[Space_Grotesk] leading-snug mb-1">
                {book.title}
              </h2>
              <p className="text-[14px] text-stone-400 mb-4">
                {book.authors.join(", ")}
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-stone-500 mb-6">
                {book.year > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {book.year}
                  </span>
                )}
                {book.pageCount > 0 && (
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> {book.pageCount} páginas
                  </span>
                )}
                {book.publisher && (
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" /> {book.publisher}
                  </span>
                )}
                {book.isbn && (
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5" /> {book.isbn}
                  </span>
                )}
              </div>

              {loadingDesc && (
                <p className="text-[13px] text-stone-600 mb-6">Cargando sinopsis...</p>
              )}
              {!loadingDesc && description && (
                <div className="mb-6">
                  <h3 className="text-[12px] uppercase tracking-wider text-stone-600 mb-2">Sinopsis</h3>
                  <p className="text-[13px] text-stone-400 leading-relaxed line-clamp-6">
                    {description}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-[12px] uppercase tracking-wider text-stone-600 mb-2">Formatos disponibles</h3>
                <div className="grid grid-cols-3 gap-2">
                  {FORMATS.map((fmt) => (
                    <div key={fmt.name} className="flex items-center gap-2 px-3 py-2 bg-amber-900/5 border border-amber-900/8 rounded-lg">
                      <FileText className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                      <div>
                        <span className="text-[12px] font-medium text-amber-100/70 block">{fmt.name}</span>
                        <span className="text-[10px] text-stone-600">{fmt.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <span className="text-2xl font-bold text-amber-100/90">
                  ${book.price.toLocaleString("es-AR")}
                </span>
                <button
                  onClick={handleAdd}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                    justAdded
                      ? "bg-emerald-800/20 text-emerald-400 border border-emerald-700/20"
                      : "bg-amber-700 text-amber-950 hover:bg-amber-600"
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Agregado
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> {inCart ? "Agregar otro" : "Agregar al carrito"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
