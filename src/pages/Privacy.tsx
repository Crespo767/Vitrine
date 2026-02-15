export default function Privacy() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold mb-6">Política de Privacidade</h1>
      <div className="prose prose-sm text-muted-foreground space-y-4">
        <p><strong>Última atualização:</strong> Fevereiro de 2026</p>
        <p>A VitrinePro está comprometida com a proteção dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).</p>
        <h2 className="font-display text-lg font-semibold text-foreground">1. Dados coletados</h2>
        <p>Podemos coletar dados de navegação (páginas visitadas, cliques), dados informados voluntariamente (nome, e-mail via formulário de contato) e cookies de sessão.</p>
        <h2 className="font-display text-lg font-semibold text-foreground">2. Uso dos dados</h2>
        <p>Os dados são utilizados para melhorar a experiência do usuário, personalizar conteúdo e análise de tráfego. Não vendemos dados pessoais a terceiros.</p>
        <h2 className="font-display text-lg font-semibold text-foreground">3. Cookies</h2>
        <p>Utilizamos cookies para armazenar preferências (como tema claro/escuro), itens do carrinho e favoritos. Você pode desabilitar cookies nas configurações do navegador.</p>
        <h2 className="font-display text-lg font-semibold text-foreground">4. Links de afiliados</h2>
        <p>Nossos links contêm identificadores de afiliado que permitem aos parceiros (Amazon e Mercado Livre) rastrear a origem do acesso. Não temos acesso a dados de compra.</p>
        <h2 className="font-display text-lg font-semibold text-foreground">5. Seus direitos (LGPD)</h2>
        <p>Você tem direito a acessar, corrigir, excluir seus dados pessoais, revogar consentimento e solicitar portabilidade. Entre em contato para exercer seus direitos.</p>
        <h2 className="font-display text-lg font-semibold text-foreground">6. Contato do encarregado (DPO)</h2>
        <p>Para questões sobre privacidade, entre em contato pela <a href="/contato" className="text-primary underline">página de contato</a>.</p>
      </div>
    </main>
  );
}
