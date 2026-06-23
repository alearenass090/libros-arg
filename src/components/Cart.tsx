import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, sendToWhatsApp } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full max-w-sm z-50 slide-in-right">
        <div className="h-full flex flex-col bg-[#110d08] border-l border-amber-900/15">
          <div className="flex items-center justify-between px-6 h-14 border-b border-amber-900/10">
            <span className="text-[14px] font-semibold text-amber-100/90">
              Carrito ({items.length})
            </span>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-amber-900/20 transition-colors cursor-pointer">
              <X className="w-4 h-4 text-stone-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-[14px] text-stone-600">Sin libros en el carrito</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.book.id} className="flex gap-3 p-3 rounded-lg bg-amber-900/5 border border-amber-900/8">
                  <img
                    src={item.book.thumbnail}
                    alt={item.book.title}
                    className="w-12 h-[72px] object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[12px] font-medium text-amber-100/80 line-clamp-2 leading-snug">
                      {item.book.title}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-1">
                      {item.book.authors.join(", ")}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center bg-amber-900/10 hover:bg-amber-900/20 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3 text-stone-400" />
                        </button>
                        <span className="text-[12px] text-amber-100/70 w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center bg-amber-900/10 hover:bg-amber-900/20 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-stone-400" />
                        </button>
                      </div>
                      <span className="text-[12px] font-semibold text-amber-600">
                        ${(item.book.price * item.quantity).toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.book.id)}
                    className="self-start p-1 rounded hover:bg-amber-900/15 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-stone-600 hover:text-red-400" />
                  </button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-amber-900/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-stone-500">Total</span>
                <span className="text-[18px] font-semibold text-amber-100/90">
                  ${totalPrice.toLocaleString("es-AR")}
                </span>
              </div>

              <button
                onClick={sendToWhatsApp}
                className="w-full py-3 text-[13px] font-medium text-amber-950 bg-amber-700 rounded-lg hover:bg-amber-600 transition-colors cursor-pointer"
              >
                Comprar por WhatsApp
              </button>

              <button
                onClick={clearCart}
                className="w-full py-2 text-[12px] text-stone-600 hover:text-stone-400 transition-colors cursor-pointer"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
