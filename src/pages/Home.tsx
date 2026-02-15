import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { getTopDeals, getBestSellers, getTopRated, categoryLabels, categoryIcons, type Category } from "@/data/products";
import { ArrowRight, Shield, Truck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const deals = getTopDeals(8);
  const bestSellers = getBestSellers(8);
  const recommended = getTopRated(8);
  const categories = Object.entries(categoryLabels) as [Category, string][];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Encontre as <span className="text-accent">melhores ofertas</span><br />em um só lugar
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Compare preços da Amazon e Mercado Livre. Compre com segurança diretamente nos parceiros de confiança.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/catalogo?sort=discount">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                Ver ofertas <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/catalogo">
              <Button size="lg" variant="outline" className="gap-2">
                Explorar categorias <Search className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-border bg-card py-6">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 px-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Parceiros de confiança</div>
          <div className="flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /> Frete direto do parceiro</div>
          <div className="flex items-center gap-2">
            <span className="rounded border border-border px-2 py-0.5 text-xs font-medium">Amazon</span>
            <span className="rounded border border-border px-2 py-0.5 text-xs font-medium">Mercado Livre</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold">Categorias em destaque</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              to={`/catalogo?categoria=${key}`}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-3xl">{categoryIcons[key]}</span>
              <span className="text-xs font-medium text-center">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">🔥 Ofertas do dia</h2>
          <Link to="/catalogo?sort=discount" className="text-sm font-medium text-primary hover:underline">Ver todas</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">⭐ Mais vendidos</h2>
            <Link to="/catalogo?sort=popular" className="text-sm font-medium text-primary hover:underline">Ver todos</Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">💡 Recomendados para você</h2>
          <Link to="/catalogo?sort=rating" className="text-sm font-medium text-primary hover:underline">Ver todos</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* How it works CTA */}
      <section className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold">Como funciona?</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Encontre", desc: "Busque e filtre entre centenas de produtos dos melhores parceiros." },
              { step: "2", title: "Compare", desc: "Veja preços, avaliações e detalhes para tomar a melhor decisão." },
              { step: "3", title: "Compre no parceiro", desc: "Clique e seja redirecionado para Amazon ou Mercado Livre para finalizar." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {s.step}
                </div>
                <h3 className="font-display font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/como-funciona" className="mt-6 inline-block">
            <Button variant="outline">Saiba mais</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
