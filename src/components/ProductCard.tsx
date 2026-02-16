import { Link } from "react-router-dom";
import { Heart, Star, ExternalLink } from "lucide-react";
import { type Product } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isFavorite } = useFavoritesStore();
  const fav = isFavorite(product.id);

  const handleAddCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ productId: product.id, quantity: 1 });
    toast({ title: "Adicionado ao carrinho!", description: product.title });
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5">
      {/* Image */}
      <Link to={`/produto/${product.id}`} className="relative aspect-square overflow-hidden bg-secondary block">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-contain p-6 transition-transform group-hover:scale-105"
          loading="lazy"
        />
        {product.discount && product.discount > 0 && (
          <Badge className="absolute left-2 top-2 bg-accent text-accent-foreground">
            -{product.discount}%
          </Badge>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product.id); }}
          className="absolute right-2 top-2 rounded-full bg-card/80 p-1.5 backdrop-blur transition-colors hover:bg-card z-10"
          aria-label="Favoritar"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-accent text-accent" : "text-muted-foreground"}`} />
        </button>
        <span className="absolute bottom-2 right-2 rounded bg-card/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur">
          {product.store === "amazon" ? "Amazon" : "Mercado Livre"}
        </span>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <Link to={`/produto/${product.id}`}>
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-primary">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString("pt-BR")})</span>
          </div>
          <div className="mt-2">
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {product.oldPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
            <p className="text-lg font-bold text-foreground">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
            <p className="text-xs text-success">{product.shippingText}</p>
          </div>
        </Link>

        <div className="mt-auto flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={handleAddCart}>
            Adicionar
          </Button>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button size="sm" className="w-full gap-1 bg-accent text-accent-foreground text-xs hover:bg-accent/90">
              Ver <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
