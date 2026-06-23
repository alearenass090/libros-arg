import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data/categories";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-amber-900/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <span className="text-[13px] text-stone-600">
            {new Date().getFullYear()} Libros Rivendell
          </span>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-stone-600 hover:text-amber-200/70 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/libros.rivendell"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-stone-600 hover:text-amber-200/70 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              @libros.rivendell
            </a>
            <span className="text-[12px] text-stone-600">Lun-Dom 09:00-22:00</span>
          </div>
        </div>

        <a
          href="https://tecnopria.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-stone-700 hover:text-amber-200/50 transition-colors"
        >
          Desarrollado por PRIA
        </a>
      </div>
    </footer>
  );
}
