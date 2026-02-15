import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-display text-lg font-bold text-primary">
              Vitrine<span className="text-accent">Pro</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Encontre as melhores ofertas em um só lugar. Compare e compre com segurança nos parceiros.
            </p>
            <div className="mt-4 flex gap-3">
              <span className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground">Amazon</span>
              <span className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground">Mercado Livre</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalogo" className="hover:text-foreground">Catálogo</Link></li>
              <li><Link to="/catalogo?sort=discount" className="hover:text-foreground">Ofertas</Link></li>
              <li><Link to="/favoritos" className="hover:text-foreground">Favoritos</Link></li>
              <li><Link to="/carrinho" className="hover:text-foreground">Carrinho</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Institucional</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/como-funciona" className="hover:text-foreground">Como Funciona</Link></li>
              <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
              <li><Link to="/termos" className="hover:text-foreground">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="hover:text-foreground">Política de Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Parceiros</h4>
            <p className="text-sm text-muted-foreground">
              Este site é uma vitrine de afiliados. Todos os produtos são vendidos e entregues pelos parceiros. O pagamento é realizado diretamente no site do parceiro.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} VitrinePro. Todos os direitos reservados. Vitrine de afiliados — não vendemos diretamente.
        </div>
      </div>
    </footer>
  );
}
