import { useParams, Link } from "react-router-dom";
import { getProductById, categoryLabels, products } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { Star, Heart, ExternalLink, ShoppingCart, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isFavorite } = useFavoritesStore();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [imgIndex, setImgIndex] = useState(0);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");

  if (!product) {
    return (
      <main className="container mx-auto flex flex-col items-center gap-4 px-4 py-20">
        <AlertTriangle className="h-12 w-12 text-accent" />
        <h1 className="font-display text-2xl font-bold">Produto não encontrado</h1>
        <Link to="/catalogo"><Button variant="outline">Voltar ao catálogo</Button></Link>
      </main>
    );
  }

  const fav = isFavorite(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem({ productId: product.id, quantity: 1, selectedColor, selectedSize });
    toast({ title: "Adicionado ao carrinho!", description: product.title });
  };

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Início</Link>
        <span className="mx-2">/</span>
        <Link to={`/catalogo?categoria=${product.category}`} className="hover:text-foreground">{categoryLabels[product.category]}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-secondary">
            <img src={product.images[imgIndex]} alt={product.title} className="h-full w-full object-contain p-8" />
            {product.discount && (
              <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground text-sm">-{product.discount}%</Badge>
            )}
            <span className="absolute bottom-3 right-3 rounded bg-card/80 px-2 py-1 text-xs font-medium backdrop-blur">
              {product.store === "amazon" ? "Amazon" : "Mercado Livre"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">{product.brand} · SKU: {product.sku}</p>
            <h1 className="mt-1 font-display text-2xl font-bold lg:text-3xl">{product.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString("pt-BR")} avaliações)</span>
          </div>

          <div>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">R$ {product.oldPrice.toFixed(2).replace(".", ",")}</span>
            )}
            <p className="text-3xl font-bold">R$ {product.price.toFixed(2).replace(".", ",")}</p>
            {product.discount && <span className="text-sm font-medium text-success">Economia de {product.discount}%</span>}
          </div>

          <p className="text-sm text-success">🚚 {product.shippingText}</p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium">Cor</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`rounded-md border px-3 py-1.5 text-sm ${selectedColor === c ? "border-primary bg-primary/10 font-medium" : "border-border hover:border-primary"}`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium">Tamanho</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`rounded-md border px-3 py-1.5 text-sm ${selectedSize === s ? "border-primary bg-primary/10 font-medium" : "border-border hover:border-primary"}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                Comprar no parceiro <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
            <div className="flex gap-2">
              <Button size="lg" variant="outline" className="flex-1 gap-2" onClick={handleAdd}>
                <ShoppingCart className="h-4 w-4" /> Adicionar ao carrinho
              </Button>
              <Button size="lg" variant="outline" onClick={() => toggle(product.id)} aria-label="Favoritar">
                <Heart className={`h-5 w-5 ${fav ? "fill-accent text-accent" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Redirect notice */}
          <div className="rounded-lg border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
            <AlertTriangle className="mr-1 inline h-3 w-3" />
            Você será redirecionado para o site do parceiro ({product.store === "amazon" ? "Amazon" : "Mercado Livre"}) para finalizar a compra. O pagamento e entrega são de responsabilidade do parceiro.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-4 border-b border-border">
          {(["desc", "specs", "reviews"] as const).map((t) => (
            <button
              key={t}
              className={`pb-3 text-sm font-medium transition-colors ${tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setTab(t)}
            >
              {t === "desc" ? "Descrição" : t === "specs" ? "Especificações" : "Avaliações"}
            </button>
          ))}
        </div>
        <div className="py-6">
          {tab === "desc" && <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>}
          {tab === "specs" && (
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([k, v]) => (
                  <tr key={k} className="border-b border-border">
                    <td className="py-2 pr-4 font-medium">{k}</td>
                    <td className="py-2 text-muted-foreground">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "reviews" && (
            <div className="space-y-4">
              {[5, 4, 3].map((stars) => (
                <div key={stars} className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: stars }).map((_, i) => <Star key={i} className="h-3 w-3 fill-accent text-accent" />)}
                    </div>
                    <span className="text-sm font-medium">Usuário{stars}23</span>
                    <span className="text-xs text-muted-foreground">há {stars} dias</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stars === 5 ? "Excelente produto! Superou minhas expectativas. Recomendo." : stars === 4 ? "Muito bom, entrega rápida e produto de qualidade." : "Bom custo-benefício. Atende bem ao propósito."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-bold mb-4">Produtos relacionados</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  );
}
