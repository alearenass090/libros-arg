import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onCartOpen: () => void;
}

export function Navbar({ onCartOpen }: NavbarProps) {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#inicio" className="text-[15px] font-semibold tracking-tight text-amber-100/90">
          Libros Rivendell
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="text-[13px] text-stone-500 hover:text-amber-200/80 transition-colors">
            Inicio
          </a>
          <a href="#categorias" className="text-[13px] text-stone-500 hover:text-amber-200/80 transition-colors">
            Categorías
          </a>
          <a href="#catalogo" className="text-[13px] text-stone-500 hover:text-amber-200/80 transition-colors">
            Catálogo
          </a>
          <a href="#contacto" className="text-[13px] text-stone-500 hover:text-amber-200/80 transition-colors">
            Contacto
          </a>

          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-lg hover:bg-amber-900/20 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-[18px] h-[18px] text-stone-400" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-700 text-amber-50 text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-lg hover:bg-amber-900/20 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-[18px] h-[18px] text-stone-400" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-700 text-amber-50 text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-amber-900/20 transition-colors cursor-pointer"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-stone-400" />
            ) : (
              <Menu className="w-5 h-5 text-stone-400" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-amber-900/10 bg-[#110d08]/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-3">
            <a href="#inicio" onClick={handleNavClick} className="text-[14px] text-stone-400 hover:text-amber-200/80 transition-colors py-1">
              Inicio
            </a>
            <a href="#categorias" onClick={handleNavClick} className="text-[14px] text-stone-400 hover:text-amber-200/80 transition-colors py-1">
              Categorías
            </a>
            <a href="#catalogo" onClick={handleNavClick} className="text-[14px] text-stone-400 hover:text-amber-200/80 transition-colors py-1">
              Catálogo
            </a>
            <a href="#contacto" onClick={handleNavClick} className="text-[14px] text-stone-400 hover:text-amber-200/80 transition-colors py-1">
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
