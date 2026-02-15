import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, BarChart3, ExternalLink, HelpCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: <Search className="h-8 w-8" />, title: "1. Encontre o produto", desc: "Use a busca ou navegue pelas categorias para encontrar o que precisa. Filtre por preço, avaliação e loja." },
    { icon: <BarChart3 className="h-8 w-8" />, title: "2. Compare ofertas", desc: "Veja preços, avaliações e condições de frete. Compare entre Amazon e Mercado Livre para escolher a melhor opção." },
    { icon: <ExternalLink className="h-8 w-8" />, title: "3. Compre no parceiro", desc: "Clique em 'Comprar no parceiro' e você será redirecionado para a Amazon ou Mercado Livre para finalizar sua compra com segurança." },
  ];

  const faqs = [
    { q: "A VitrinePro vende produtos diretamente?", a: "Não. Somos uma vitrine de afiliados. Todos os produtos são vendidos e entregues pela Amazon ou Mercado Livre." },
    { q: "Como funciona o pagamento?", a: "O pagamento é realizado diretamente no site do parceiro (Amazon ou Mercado Livre), com toda a segurança das plataformas." },
    { q: "E se eu tiver problemas com o produto?", a: "Todo o suporte pós-venda é feito pelo parceiro onde você realizou a compra. Cada um possui sua própria política de trocas e devoluções." },
    { q: "Os preços são atualizados?", a: "Fazemos o possível para manter os preços atualizados, mas o preço final é sempre o exibido no site do parceiro no momento da compra." },
    { q: "É seguro comprar pelos links?", a: "Sim! Todos os links direcionam para as plataformas oficiais da Amazon e Mercado Livre." },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-center">Como funciona</h1>
      <p className="mt-2 text-center text-muted-foreground max-w-xl mx-auto">
        A VitrinePro reúne as melhores ofertas da Amazon e Mercado Livre em um só lugar para facilitar sua vida.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.title} className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">{s.icon}</div>
            <h2 className="font-display text-lg font-semibold">{s.title}</h2>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-center mb-8">
          <HelpCircle className="inline h-6 w-6 mr-2" />
          Perguntas frequentes
        </h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-lg border border-border bg-card">
              <summary className="cursor-pointer px-5 py-4 text-sm font-medium">{f.q}</summary>
              <p className="px-5 pb-4 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link to="/catalogo">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Explorar produtos</Button>
        </Link>
      </div>
    </main>
  );
}
