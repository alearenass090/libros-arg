import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Book, CartItem } from "../types";
import { WHATSAPP_NUMBER } from "../data/categories";

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  sendToWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((book: Book) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((item) => item.book.id !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.book.id !== bookId));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.book.id === bookId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  const sendToWhatsApp = useCallback(() => {
    if (items.length === 0) return;

    let message = "¡Hola! Quiero comprar los siguientes libros:\n\n";

    items.forEach((item, i) => {
      message += `${i + 1}. *${item.book.title}* — ${item.book.authors.join(", ")}`;
      if (item.quantity > 1) message += ` (x${item.quantity})`;
      message += ` — $${(item.book.price * item.quantity).toLocaleString("es-AR")}\n`;
    });

    message += `\n*Total: $${totalPrice.toLocaleString("es-AR")}*`;
    message += "\n\n¡Gracias!";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }, [items, totalPrice]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, sendToWhatsApp }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
