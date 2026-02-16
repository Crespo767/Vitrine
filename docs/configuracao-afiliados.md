# Guia de Configuração: Programas de Afiliados

Este guia descreve os passos para se cadastrar e obter os links de afiliado para Amazon e Mercado Livre, permitindo monetizar os produtos na VitrinePro.

## 1. Amazon Associates (Associados Amazon)

O programa de associados da Amazon permite ganhar comissões por produtos vendidos através dos seus links.

### Passo a Passo:
1.  **Cadastro**:
    *   Acesse o [Portal de Associados da Amazon Brasil](https://associados.amazon.com.br/).
    *   Faça login com sua conta Amazon ou crie uma nova.
    *   Siga o fluxo de cadastro informando seus dados e os sites/apps onde divulgará os produtos (informe a URL da sua VitrinePro, mesmo que em desenvolvimento/teste, ou suas redes sociais).
2.  **Obtendo Links**:
    *   Após a aprovação, você terá acesso ao **SiteStripe** (barra de ferramentas no topo do site da Amazon quando logado).
    *   Navegue até a página de qualquer produto na Amazon.
    *   Clique em "Texto" na barra SiteStripe para gerar seu link curto de afiliado (ex: `amzn.to/...`).
3.  **Na VitrinePro**:
    *   Copie esse link.
    *   Adicione ao campo `affiliateUrl` no arquivo `src/data/products.ts` para o respectivo produto.

## 2. Mercado Livre Afiliados

O programa do Mercado Livre também oferece comissões por vendas geradas.

### Passo a Passo:
1.  **Cadastro**:
    *   Acesse a página do [Programa de Afiliados do Mercado Livre](https://www.mercadolivre.com.br/l/afiliados-home).
    *   Preencha o formulário de inscrição.
    *   Aguarde a análise e aprovação da sua conta.
2.  **Obtendo Links**:
    *   Acesse o painel de afiliados.
    *   Utilize o gerador de links para criar URLs rastreáveis para produtos específicos ou categorias.
    *   Alternativamente, alguns produtos já possuem opção de "Compartilhar e ganhar" no próprio app/site se você for afiliado.
3.  **Na VitrinePro**:
    *   Copie o link gerado.
    *   Adicione ao campo `affiliateUrl` no arquivo `src/data/products.ts`.

## Dicas Importantes

*   **Divulgação**: Sempre deixe claro para seus usuários que os links são de afiliado (a VitrinePro já possui avisos visuais no detalhe do produto).
*   **Teste**: Clique nos seus próprios links em uma aba anônima para garantir que o redirecionamento está correto.
*   **Regras**: Leia atentamente os termos de serviço de cada programa para evitar banimentos (ex: não fazer spam, não usar encurtadores não autorizados, etc).
