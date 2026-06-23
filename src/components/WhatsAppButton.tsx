import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data/categories";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all hover:scale-105"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-[13px] font-medium hidden sm:inline">Escribinos</span>
    </a>
  );
}
