import { useState, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SearchBar } from "./components/SearchBar";
import { Carousel } from "./components/Carousel";
import { Categories } from "./components/Categories";
import { BookGrid } from "./components/BookGrid";
import { BookDetail } from "./components/BookDetail";
import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { getFeatured } from "./services/bookApi";
import type { Book } from "./types";

const populares = getFeatured("populares", 10);
const seleccion = getFeatured("seleccion", 10);

export default function App() {
  const [activeCategory, setActiveCategory] = useState("ciencia-ficcion");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query) {
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(id);
    setSearchQuery("");
  }, []);

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />

      <Hero />

      <div className="max-w-6xl mx-auto px-6 mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>

      <Carousel title="Populares" books={populares} onSelectBook={setSelectedBook} />
      <Carousel title="Nuestra selección" books={seleccion} onSelectBook={setSelectedBook} />

      <Categories activeCategory={activeCategory} onSelect={handleCategorySelect} />
      <BookGrid categoryId={activeCategory} searchQuery={searchQuery} onSelectBook={setSelectedBook} />

      <Footer />

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
      <WhatsAppButton />
    </>
  );
}
