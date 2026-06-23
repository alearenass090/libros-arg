import type { Category } from "../types";

export const specialCategories: Category[] = [
  { id: "populares", name: "Populares", icon: "popular", query: "best+seller+novela+español" },
  { id: "nuestra-seleccion", name: "Nuestra selección", icon: "selection", query: "clásicos+literatura+universal" },
];

export const categories: Category[] = [
  { id: "ciencia-ficcion", name: "Ciencia Ficción", icon: "sci-fi", query: "ciencia+ficción+novela+futuro" },
  { id: "romance", name: "Romance", icon: "romance", query: "novela+romántica+amor" },
  { id: "terror", name: "Terror", icon: "terror", query: "terror+miedo+novela+suspenso" },
  { id: "thriller", name: "Thriller", icon: "thriller", query: "thriller+policial+crimen+misterio" },
  { id: "fantasia", name: "Fantasía", icon: "fantasy", query: "fantasía+novela+magia+aventura" },
  { id: "literatura-argentina", name: "Literatura Argentina", icon: "argentina", query: "literatura+argentina+novela+cuentos" },
  { id: "contemporanea", name: "Contemporánea", icon: "contemporary", query: "narrativa+contemporánea+novela+actual" },
  { id: "historica", name: "Novela Histórica", icon: "historical", query: "novela+histórica+historia+época" },
  { id: "poesia", name: "Poesía", icon: "poetry", query: "poesía+poemas+versos" },
  { id: "infantiles", name: "Infantiles", icon: "children", query: "cuentos+infantiles+niños+colorear" },
  { id: "autoayuda", name: "Autoayuda", icon: "selfhelp", query: "autoayuda+superación+personal+motivación" },
  { id: "educativos", name: "Educativos", icon: "education", query: "educación+aprendizaje+enseñanza+escolar" },
];

export const allCategories = [...specialCategories, ...categories];

export const WHATSAPP_NUMBER = "5493541220411";

export const FORMATS = [
  { name: "PDF", description: "Compatible con cualquier dispositivo" },
  { name: "EPUB", description: "Ideal para lectores digitales" },
  { name: "MOBI", description: "Para Kindle clásico" },
  { name: "AZW3", description: "Formato nativo Kindle" },
  { name: "FB2", description: "Popular en lectores europeos" },
  { name: "TXT", description: "Texto plano, universal" },
];
