import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ExternalLink, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [cep, setCep] = useState("");
  const [shippingCalculated, setShippingCalculated] = useState(false);

  const cartProducts = items.map((item) => ({
    ...item,
    product: getProductById(item.productId),
  })).filter((i) => i.product);

  const subtotal = cartProducts.reduce((sum, i) => sum + (i.product!.price * i.quantity), 0);

  if (cartProducts.length === 0) {
    return (
      <main className="container mx-auto flex flex-col items-center gap-4 px-4 py-20">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        <h1 className="font-display text-2xl font-bold">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground">Adicione produtos para continuar.</p>
        <Link to="/catalogo"><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Explorar produtos</Button></Link>
      </main>
    );
  }

  // Group by store
  const byStore = cartProducts.reduce((acc, i) => {
    const store = i.product!.store;
    if (!acc[store]) acc[store] = [];
    acc[store].push(i);
    return acc;
  }, {} as Record<string, typeof cartProducts>);

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="font-display text-2xl font-bold mb-6">Carrinho</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cartProducts.map(({ product, quantity, productId }) => (
            <div key={productId} className="flex gap-4 rounded-lg border border-border bg-card p-4">
              <Link to={`/produto/${productId}`} className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                <img src={product!.images[0]} alt={product!.title} className="h-full w-full object-contain p-2" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/produto/${productId}`} className="text-sm font-medium hover:text-primary line-clamp-2">{product!.title}</Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {product!.store === "amazon" ? "Amazon" : "Mercado Livre"}
                </p>
                <p className="mt-1 font-bold">R$ {product!.price.toFixed(2).replace(".", ",")}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(productId)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                <div className="flex items-center gap-1 rounded-md border border-border">
                  <button className="px-2 py-1" onClick={() => updateQuantity(productId, quantity - 1)}><Minus className="h-3 w-3" /></button>
                  <span className="px-2 text-sm font-medium">{quantity}</span>
                  <button className="px-2 py-1" onClick={() => updateQuantity(productId, quantity + 1)}><Plus className="h-3 w-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold mb-4">Resumo</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>R$ {subtotal.toFixed(2).replace(".", ",")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span className="text-success">Calculado pelo parceiro</span></div>
            </div>

            {/* CEP (mock) */}
            <div className="mt-4">
              <label className="text-xs font-medium text-muted-foreground">Simular frete (CEP)</label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  maxLength={9}
                  placeholder="00000-000"
                  className="flex-1 rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm outline-none"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
                <Button variant="outline" size="sm" onClick={() => setShippingCalculated(true)}>Calcular</Button>
              </div>
              {shippingCalculated && <p className="mt-2 text-xs text-success">✓ Frete estimado: R$ 0,00 – Grátis (simulação)</p>}
            </div>

            <hr className="my-4 border-border" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          {/* Redirect per store */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground text-center">O pagamento é feito diretamente no site do parceiro.</p>
            {Object.entries(byStore).map(([store, storeItems]) => (
              <a
                key={store}
                href={storeItems[0].product!.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90 mb-2">
                  Ir para {store === "amazon" ? "Amazon" : "Mercado Livre"} ({storeItems.length} {storeItems.length === 1 ? "item" : "itens"}) <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            ))}
          </div>

          <Button variant="ghost" size="sm" className="w-full text-destructive" onClick={clearCart}>Limpar carrinho</Button>
        </div>
      </div>
    </main>
  );
}
