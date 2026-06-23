import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center">

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p className="text-[13px] text-stone-600 tracking-widest uppercase mb-6">
          Librería digital
        </p>

        <h1 className="text-4xl md:text-[56px] font-bold font-[Space_Grotesk] tracking-tight leading-[1.1] text-amber-100/90 mb-5">
          Tu próxima lectura empieza acá
        </h1>

        <p className="text-[15px] text-stone-500 leading-relaxed mb-10 max-w-lg mx-auto">
          Libros digitales en español. Explorá el catálogo, armá tu pedido y recibilo al instante.
        </p>

        <a
          href="#categorias"
          className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-medium text-amber-950 bg-amber-700 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Ver catálogo
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
