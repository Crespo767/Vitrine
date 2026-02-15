import { useFavoritesStore } from "@/stores/favoritesStore";
import { getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Favorites() {
  const { ids, clear } = useFavoritesStore();
  const favProducts = ids.map(getProductById).filter(Boolean);

  if (favProducts.length === 0) {
    return (
      <main className="container mx-auto flex flex-col items-center gap-4 px-4 py-20">
        <Heart className="h-16 w-16 text-muted-foreground" />
        <h1 className="font-display text-2xl font-bold">Nenhum favorito ainda</h1>
        <p className="text-muted-foreground">Salve produtos para acompanhar preços e ofertas.</p>
        <Link to="/catalogo"><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Explorar produtos</Button></Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Favoritos ({favProducts.length})</h1>
        <Button variant="ghost" size="sm" className="text-destructive" onClick={clear}>Limpar todos</Button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {favProducts.map((p) => <ProductCard key={p!.id} product={p!} />)}
      </div>
    </main>
  );
}
