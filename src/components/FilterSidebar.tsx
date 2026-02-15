import { useSearchParams } from "react-router-dom";
import { categoryLabels, type Category, type Store } from "@/data/products";
import { Slider } from "@/components/ui/slider";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FilterSidebar({ onClose }: { onClose?: () => void }) {
  const [params, setParams] = useSearchParams();

  const selectedCategory = params.get("categoria") || "";
  const selectedStore = params.get("loja") || "";
  const minPrice = Number(params.get("minPreco")) || 0;
  const maxPrice = Number(params.get("maxPreco")) || 3000;
  const minRating = Number(params.get("avaliacao")) || 0;

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("pagina");
    setParams(next);
  };

  const clearFilters = () => setParams({});

  const categories = Object.entries(categoryLabels) as [Category, string][];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold">Filtros</h3>
        <div className="flex gap-2">
          <button onClick={clearFilters} className="text-xs text-primary hover:underline">Limpar</button>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-6 w-6 lg:hidden" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Categoria */}
      <div>
        <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categoria</h4>
        <div className="space-y-1">
          {categories.map(([key, label]) => (
            <button
              key={key}
              className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                selectedCategory === key ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              }`}
              onClick={() => update("categoria", selectedCategory === key ? "" : key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Loja */}
      <div>
        <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Loja</h4>
        {(["amazon", "mercado_livre"] as Store[]).map((s) => (
          <button
            key={s}
            className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
              selectedStore === s ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
            }`}
            onClick={() => update("loja", selectedStore === s ? "" : s)}
          >
            {s === "amazon" ? "Amazon" : "Mercado Livre"}
          </button>
        ))}
      </div>

      {/* Preço */}
      <div>
        <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Faixa de preço</h4>
        <Slider
          min={0}
          max={3000}
          step={50}
          value={[minPrice, maxPrice]}
          onValueChange={([min, max]) => {
            update("minPreco", min > 0 ? String(min) : "");
            update("maxPreco", max < 3000 ? String(max) : "");
          }}
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>R$ {minPrice}</span>
          <span>R$ {maxPrice}</span>
        </div>
      </div>

      {/* Avaliação */}
      <div>
        <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avaliação mínima</h4>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              className={`flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-sm transition-colors ${
                minRating === r ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              }`}
              onClick={() => update("avaliacao", minRating === r ? "" : String(r))}
            >
              {Array.from({ length: r }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
              <span className="ml-1">& acima</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
