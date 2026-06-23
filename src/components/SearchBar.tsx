import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar por título o autor..."
        className="w-full pl-10 pr-10 py-2.5 text-[13px] bg-amber-900/8 border border-amber-800/12 rounded-lg text-amber-100/80 placeholder-stone-600 outline-none focus:border-amber-700/30 transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-amber-900/15 cursor-pointer"
        >
          <X className="w-3.5 h-3.5 text-stone-500" />
        </button>
      )}
    </form>
  );
}
