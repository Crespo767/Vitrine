import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { products, categoryLabels, type Category, type Store } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

const ITEMS_PER_PAGE = 12;

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading] = useState(false);

  const query = params.get("q")?.toLowerCase() || "";
  const category = params.get("categoria") as Category | null;
  const store = params.get("loja") as Store | null;
  const minPrice = Number(params.get("minPreco")) || 0;
  const maxPrice = Number(params.get("maxPreco")) || Infinity;
  const minRating = Number(params.get("avaliacao")) || 0;
  const sort = params.get("sort") || "relevancia";
  const page = Number(params.get("pagina")) || 1;

  const filtered = useMemo(() => {
    let list = [...products];
    if (query) list = list.filter((p) => p.title.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query) || p.tags.some((t) => t.includes(query)));
    if (category) list = list.filter((p) => p.category === category);
    if (store) list = list.filter((p) => p.store === store);
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (minRating) list = list.filter((p) => p.rating >= minRating);

    switch (sort) {
      case "menor": list.sort((a, b) => a.price - b.price); break;
      case "maior": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "discount": list.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
      case "popular": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return list;
  }, [query, category, store, minPrice, maxPrice, minRating, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const setSort = (s: string) => {
    const next = new URLSearchParams(params);
    next.set("sort", s);
    next.delete("pagina");
    setParams(next);
  };

  const goPage = (p: number) => {
    const next = new URLSearchParams(params);
    next.set("pagina", String(p));
    setParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sortOptions = [
    { value: "relevancia", label: "Relevância" },
    { value: "menor", label: "Menor preço" },
    { value: "maior", label: "Maior preço" },
    { value: "rating", label: "Melhores avaliados" },
    { value: "discount", label: "Maior desconto" },
    { value: "popular", label: "Mais populares" },
  ];

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground">Início</a>
        <span className="mx-2">/</span>
        <span className="text-foreground">Catálogo</span>
        {category && <><span className="mx-2">/</span><span className="text-foreground">{categoryLabels[category]}</span></>}
      </nav>

      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-2xl font-bold">
          {query ? `Resultados para "${query}"` : category ? categoryLabels[category] : "Todos os produtos"}
        </h1>
        <Button variant="outline" size="sm" className="gap-2 lg:hidden" onClick={() => setDrawerOpen(true)}>
          <SlidersHorizontal className="h-4 w-4" /> Filtros
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <FilterSidebar />
        </aside>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/20" onClick={() => setDrawerOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-xl bg-card p-6 animate-slide-in">
              <FilterSidebar onClose={() => setDrawerOpen(false)} />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">{filtered.length} produtos</span>
            <span className="text-muted-foreground">·</span>
            <div className="flex flex-wrap gap-1">
              {sortOptions.map((o) => (
                <button
                  key={o.value}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    sort === o.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => setSort(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <ProductGridSkeleton />
          ) : paged.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-lg font-medium">Nenhum produto encontrado</p>
              <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou limpar a busca.</p>
              <Button variant="outline" onClick={() => setParams({})}>Limpar filtros</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {paged.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => goPage(page - 1)}>
                    Anterior
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={`h-8 w-8 rounded-md text-sm font-medium ${
                        p === page ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      }`}
                      onClick={() => goPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => goPage(page + 1)}>
                    Próximo
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
