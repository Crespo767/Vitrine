import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { categoryLabels, categoryIcons, searchProducts, type Category } from "@/data/products";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: string; title: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
  const [catOpen, setCatOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const itemCount = useCartStore((s) => s.getItemCount());
  const favCount = useFavoritesStore((s) => s.ids.length);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.length >= 2) {
      const results = searchProducts(q).slice(0, 6);
      setSuggestions(results.map((p) => ({ id: p.id, title: p.title })));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const submitSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const categories = Object.entries(categoryLabels) as [Category, string][];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex items-center gap-4 px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 font-display text-xl font-bold text-primary">
          Vitrine<span className="text-accent">Pro</span>
        </Link>

        {/* Categories dropdown - desktop */}
        <div className="relative hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-sm"
            onClick={() => setCatOpen(!catOpen)}
          >
            Categorias <ChevronDown className="h-3 w-3" />
          </Button>
          {catOpen && (
            <div className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-border bg-card p-2 shadow-lg">
              {categories.map(([key, label]) => (
                <Link
                  key={key}
                  to={`/catalogo?categoria=${key}`}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-secondary"
                  onClick={() => setCatOpen(false)}
                >
                  <span>{categoryIcons[key]}</span> {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div ref={searchRef} className="relative flex-1">
          <div className="flex items-center rounded-lg border border-border bg-secondary/50 px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos, marcas..."
              className="w-full bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitSearch()}
            />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-border bg-card p-2 shadow-lg">
              {suggestions.map((s) => (
                <Link
                  key={s.id}
                  to={`/produto/${s.id}`}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
                  onClick={() => setShowSuggestions(false)}
                >
                  {s.title}
                </Link>
              ))}
              <button
                className="mt-1 w-full rounded-md px-3 py-2 text-center text-sm font-medium text-primary hover:bg-secondary"
                onClick={submitSearch}
              >
                Ver todos os resultados para "{searchQuery}"
              </button>
            </div>
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Alternar tema">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link to="/favoritos">
            <Button variant="ghost" size="icon" className="relative" aria-label="Favoritos">
              <Heart className="h-5 w-5" />
              {favCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {favCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/carrinho">
            <Button variant="ghost" size="icon" className="relative" aria-label="Carrinho">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm">Entrar</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
          {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="border-t border-border bg-card p-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-2">
            {categories.map(([key, label]) => (
              <Link
                key={key}
                to={`/catalogo?categoria=${key}`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-secondary"
                onClick={() => setMobileMenu(false)}
              >
                <span>{categoryIcons[key]}</span> {label}
              </Link>
            ))}
            <hr className="border-border" />
            <div className="flex items-center justify-between gap-2">
              <Link to="/favoritos" onClick={() => setMobileMenu(false)}>
                <Button variant="ghost" size="sm" className="gap-2"><Heart className="h-4 w-4" /> Favoritos ({favCount})</Button>
              </Link>
              <Link to="/carrinho" onClick={() => setMobileMenu(false)}>
                <Button variant="ghost" size="sm" className="gap-2"><ShoppingCart className="h-4 w-4" /> Carrinho ({itemCount})</Button>
              </Link>
            </div>
            <Link to="/login" onClick={() => setMobileMenu(false)}>
              <Button variant="outline" className="w-full">Entrar</Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={toggleDark} className="gap-2">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} {darkMode ? "Modo claro" : "Modo escuro"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
