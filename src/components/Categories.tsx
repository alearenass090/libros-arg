import { categories } from "../data/categories";

interface CategoriesProps {
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

export function Categories({ activeCategory, onSelect }: CategoriesProps) {
  return (
    <section id="categorias" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold text-amber-100/90 mb-6">Categorías</h2>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-amber-700 text-amber-50"
                  : "bg-amber-900/10 text-stone-500 border border-amber-800/10 hover:text-amber-200/70 hover:border-amber-700/25"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
