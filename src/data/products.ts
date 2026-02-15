export type Store = "amazon" | "mercado_livre";
export type Category = "eletronicos" | "casa" | "moda" | "livros" | "beleza" | "games" | "acessorios";

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  store: Store;
  affiliateUrl: string;
  shippingText: string;
  tags: string[];
  description: string;
  specs: Record<string, string>;
  sku: string;
  colors?: string[];
  sizes?: string[];
}

export const categoryLabels: Record<Category, string> = {
  eletronicos: "Eletrônicos",
  casa: "Casa e Cozinha",
  moda: "Moda",
  livros: "Livros",
  beleza: "Beleza",
  games: "Games",
  acessorios: "Acessórios",
};

export const categoryIcons: Record<Category, string> = {
  eletronicos: "📱",
  casa: "🏠",
  moda: "👗",
  livros: "📚",
  beleza: "💄",
  games: "🎮",
  acessorios: "⌚",
};

const storeUrls: Record<Store, string> = {
  amazon: "https://www.amazon.com.br/dp/example?tag=vitrinepro-20",
  mercado_livre: "https://www.mercadolivre.com.br/p/example?matt_tool=vitrinepro",
};

function generateProducts(): Product[] {
  const products: Product[] = [];
  let id = 1;

  const data: { category: Category; items: Omit<Product, "id" | "sku" | "affiliateUrl" | "images" | "category">[] }[] = [
    {
      category: "eletronicos",
      items: [
        { title: "Fone de Ouvido Bluetooth Pro Max", brand: "SoundWave", price: 189.9, oldPrice: 299.9, discount: 37, rating: 4.7, reviewCount: 2341, store: "amazon", shippingText: "Frete grátis", tags: ["bluetooth", "sem fio", "cancelamento de ruído"], description: "Fone de ouvido sem fio com cancelamento ativo de ruído, bateria de 40 horas e microfone integrado. Conexão Bluetooth 5.3 para áudio de alta definição.", specs: { Conectividade: "Bluetooth 5.3", Bateria: "40 horas", "Cancelamento de ruído": "Ativo (ANC)", Peso: "250g", Driver: "40mm" }, colors: ["Preto", "Branco", "Azul"] },
        { title: "Smartwatch Fitness Tracker Ultra", brand: "TechFit", price: 349.9, oldPrice: 499.9, discount: 30, rating: 4.5, reviewCount: 1823, store: "mercado_livre", shippingText: "Frete grátis", tags: ["smartwatch", "fitness", "monitor cardíaco"], description: "Smartwatch com GPS integrado, monitor de frequência cardíaca, SpO2, mais de 100 modos esportivos e tela AMOLED de 1.43 polegadas.", specs: { Tela: "1.43\" AMOLED", GPS: "Integrado", Bateria: "14 dias", "Resist. água": "5ATM", Sensores: "HR, SpO2, Temp" }, colors: ["Preto", "Verde Militar", "Cinza"] },
        { title: "Carregador Portátil 20000mAh", brand: "PowerUp", price: 129.9, oldPrice: 179.9, discount: 28, rating: 4.6, reviewCount: 3456, store: "amazon", shippingText: "Chega amanhã", tags: ["powerbank", "carregador", "portátil"], description: "Power bank de 20000mAh com carregamento rápido PD 65W e duas portas USB-C. Recarrega notebooks e smartphones simultaneamente.", specs: { Capacidade: "20000mAh", "Potência máx.": "65W PD", Portas: "2x USB-C, 1x USB-A", Peso: "380g" } },
        { title: "Caixa de Som Bluetooth à Prova D'Água", brand: "BoomBox", price: 259.9, oldPrice: 349.9, discount: 26, rating: 4.8, reviewCount: 987, store: "mercado_livre", shippingText: "Frete grátis", tags: ["caixa de som", "bluetooth", "prova d'água"], description: "Caixa de som portátil com 30W de potência, bateria de 20h e certificação IP67. Som 360° com graves profundos.", specs: { Potência: "30W", Bateria: "20 horas", Proteção: "IP67", Bluetooth: "5.3", Peso: "680g" }, colors: ["Preto", "Azul", "Vermelho"] },
        { title: "Webcam Full HD 1080p com Microfone", brand: "VisionTech", price: 179.9, oldPrice: 249.9, discount: 28, rating: 4.4, reviewCount: 654, store: "amazon", shippingText: "Chega em 2 dias", tags: ["webcam", "home office", "streaming"], description: "Webcam 1080p/60fps com foco automático, microfone duplo com cancelamento de ruído e correção de luz.", specs: { Resolução: "1080p 60fps", Foco: "Automático", Microfone: "Duplo estéreo", Conexão: "USB-C", "Campo visão": "90°" } },
        { title: "Teclado Mecânico RGB Gamer", brand: "KeyStrike", price: 299.9, oldPrice: 449.9, discount: 33, rating: 4.6, reviewCount: 1245, store: "mercado_livre", shippingText: "Frete grátis", tags: ["teclado", "mecânico", "gamer", "RGB"], description: "Teclado mecânico com switches hot-swap, iluminação RGB por tecla, layout ABNT2 e construção em alumínio.", specs: { Switches: "Hot-swappable", Layout: "ABNT2 TKL", Iluminação: "RGB por tecla", Conexão: "USB-C destacável", Material: "Alumínio + PBT" }, colors: ["Preto", "Branco"] },
        { title: "Mouse Sem Fio Ergonômico", brand: "ErgoPro", price: 149.9, oldPrice: 219.9, discount: 32, rating: 4.3, reviewCount: 876, store: "amazon", shippingText: "Chega amanhã", tags: ["mouse", "ergonômico", "sem fio"], description: "Mouse vertical ergonômico com sensor de 4000 DPI, 6 botões programáveis e design que reduz fadiga no pulso.", specs: { Sensor: "4000 DPI", Botões: "6 programáveis", Bateria: "Recarregável USB-C", Conexão: "Bluetooth + Dongle", Peso: "120g" } },
        { title: "Monitor LED 27\" 4K UHD", brand: "ViewMax", price: 1899.9, oldPrice: 2499.9, discount: 24, rating: 4.7, reviewCount: 432, store: "mercado_livre", shippingText: "Frete grátis", tags: ["monitor", "4K", "IPS"], description: "Monitor IPS 4K UHD com HDR400, 99% sRGB, USB-C com carregamento de 65W e bordas ultrafinas.", specs: { Tela: "27\" IPS", Resolução: "3840x2160", HDR: "HDR400", "Taxa atualiz.": "60Hz", "Porta USB-C": "65W PD" } },
        { title: "Tablet 10.4\" 128GB Wi-Fi", brand: "TabVision", price: 1299.9, oldPrice: 1699.9, discount: 24, rating: 4.5, reviewCount: 567, store: "amazon", shippingText: "Frete grátis", tags: ["tablet", "estudos", "entretenimento"], description: "Tablet com tela 2K, processador octa-core, 6GB RAM, 128GB de armazenamento e bateria de 7040mAh.", specs: { Tela: "10.4\" 2K", Processador: "Octa-core 2.2GHz", RAM: "6GB", Armazenamento: "128GB", Bateria: "7040mAh" }, colors: ["Cinza", "Prata"] },
        { title: "Cabo USB-C para USB-C 2m Reforçado", brand: "CablePro", price: 49.9, oldPrice: 79.9, discount: 38, rating: 4.8, reviewCount: 5678, store: "mercado_livre", shippingText: "Chega em 3 dias", tags: ["cabo", "USB-C", "carregamento rápido"], description: "Cabo trançado em nylon com suporte a 100W PD e transferência de dados a 480Mbps. Testado para 30.000 dobras.", specs: { Comprimento: "2 metros", Potência: "100W PD", Dados: "480Mbps", Material: "Nylon trançado", Conector: "USB-C para USB-C" } },
        { title: "Fone de Ouvido In-Ear com Fio", brand: "SoundWave", price: 69.9, oldPrice: 99.9, discount: 30, rating: 4.2, reviewCount: 3210, store: "amazon", shippingText: "Chega amanhã", tags: ["fone", "in-ear", "com fio"], description: "Fone in-ear com driver de 10mm, microfone inline e conector P2 universal. Inclui 3 tamanhos de ponteiras.", specs: { Driver: "10mm", Conector: "P2 3.5mm", "Resp. freq.": "20Hz-20kHz", Microfone: "Inline", Cabo: "1.2m" } },
        { title: "Hub USB-C 7 em 1", brand: "TechFit", price: 199.9, oldPrice: 289.9, discount: 31, rating: 4.5, reviewCount: 876, store: "mercado_livre", shippingText: "Frete grátis", tags: ["hub", "USB-C", "adaptador"], description: "Hub com HDMI 4K, 2x USB-A 3.0, USB-C PD 100W, leitor SD/MicroSD e Ethernet Gigabit.", specs: { HDMI: "4K@60Hz", "USB-A": "2x 3.0", "USB-C PD": "100W", Rede: "Gigabit Ethernet", Cartão: "SD/MicroSD" } },
      ],
    },
    {
      category: "casa",
      items: [
        { title: "Cafeteira Elétrica Programável 1.5L", brand: "BrewMaster", price: 249.9, oldPrice: 399.9, discount: 37, rating: 4.6, reviewCount: 1567, store: "amazon", shippingText: "Frete grátis", tags: ["cafeteira", "programável", "cozinha"], description: "Cafeteira com timer programável, jarra térmica de 1.5L, sistema antigotejamento e força do café ajustável.", specs: { Capacidade: "1.5L (20 xícaras)", Timer: "24h programável", Jarra: "Térmica inox", Potência: "900W", Filtro: "Permanente lavável" }, colors: ["Preto", "Inox"] },
        { title: "Aspirador Robô com Mapeamento Laser", brand: "CleanBot", price: 1599.9, oldPrice: 2299.9, discount: 30, rating: 4.7, reviewCount: 876, store: "mercado_livre", shippingText: "Frete grátis", tags: ["aspirador", "robô", "smart home"], description: "Aspirador e passa pano 2 em 1 com mapeamento LiDAR, sucção de 4000Pa e controle por app.", specs: { Sucção: "4000Pa", Mapeamento: "LiDAR", Bateria: "5200mAh", "Autonomia": "180 min", "Nível ruído": "65dB" } },
        { title: "Panela Elétrica Multifuncional 6L", brand: "CookFast", price: 349.9, oldPrice: 499.9, discount: 30, rating: 4.8, reviewCount: 2134, store: "amazon", shippingText: "Chega amanhã", tags: ["panela", "pressão", "elétrica"], description: "Panela de pressão elétrica com 14 funções, timer, painel digital e tampa de segurança com 5 travas.", specs: { Capacidade: "6 litros", Funções: "14 pré-definidas", Potência: "1000W", Material: "Inox 304", Segurança: "5 travas" } },
        { title: "Conjunto de Panelas Antiaderente 7 Peças", brand: "ChefLine", price: 299.9, oldPrice: 449.9, discount: 33, rating: 4.4, reviewCount: 987, store: "mercado_livre", shippingText: "Frete grátis", tags: ["panelas", "antiaderente", "cozinha"], description: "Kit com 2 frigideiras, 3 panelas com tampa e 1 leiteira. Revestimento cerâmico livre de PFOA.", specs: { Peças: "7", Revestimento: "Cerâmico", Material: "Alumínio forjado", Compatível: "Fogão e indução", Livre: "PFOA/PFOS" }, colors: ["Grafite", "Vermelho"] },
        { title: "Luminária de Mesa LED com Carregador Wireless", brand: "LightUp", price: 189.9, oldPrice: 269.9, discount: 30, rating: 4.5, reviewCount: 654, store: "amazon", shippingText: "Chega em 2 dias", tags: ["luminária", "LED", "carregador wireless"], description: "Luminária com 5 modos de cor, 10 níveis de brilho e base com carregador wireless Qi de 15W.", specs: { "Modos cor": "5", Brilho: "10 níveis", Carregador: "Qi 15W", "Temp. cor": "2700K-6500K", Material: "Alumínio" }, colors: ["Branco", "Preto"] },
        { title: "Organizador de Cozinha Giratório", brand: "HomeOrg", price: 89.9, oldPrice: 139.9, discount: 36, rating: 4.3, reviewCount: 2345, store: "mercado_livre", shippingText: "Chega em 3 dias", tags: ["organizador", "cozinha", "giratório"], description: "Organizador giratório 360° com 2 níveis para temperos, molhos e condimentos. Base antiderrapante.", specs: { Níveis: "2", Rotação: "360°", Diâmetro: "30cm", Material: "Plástico BPA-free", Base: "Antiderrapante" } },
        { title: "Purificador de Ar com Filtro HEPA", brand: "FreshAir", price: 699.9, oldPrice: 999.9, discount: 30, rating: 4.6, reviewCount: 432, store: "amazon", shippingText: "Frete grátis", tags: ["purificador", "ar", "HEPA"], description: "Purificador com filtro HEPA H13 que remove 99.97% de partículas, sensor de qualidade do ar e modo silencioso.", specs: { Filtro: "HEPA H13", Cobertura: "40m²", "Nível ruído": "24dB (min)", Sensor: "PM2.5", Modos: "Auto, Sleep, Turbo" } },
        { title: "Jogo de Lençol 300 Fios Queen", brand: "SleepWell", price: 159.9, oldPrice: 249.9, discount: 36, rating: 4.7, reviewCount: 1876, store: "mercado_livre", shippingText: "Frete grátis", tags: ["lençol", "cama", "300 fios"], description: "Jogo de lençol queen em algodão egípcio 300 fios com 4 peças: lençol com elástico, lençol de cima e 2 fronhas.", specs: { Fios: "300", Material: "Algodão egípcio", Tamanho: "Queen", Peças: "4", Lavagem: "Máquina" }, colors: ["Branco", "Cinza", "Azul Marinho"] },
        { title: "Fritadeira Air Fryer Digital 5.5L", brand: "CookFast", price: 449.9, oldPrice: 649.9, discount: 31, rating: 4.8, reviewCount: 3456, store: "amazon", shippingText: "Frete grátis", tags: ["air fryer", "fritadeira", "sem óleo"], description: "Air Fryer digital com 10 programas pré-definidos, timer de 60 min, painel touch e cesto antiaderente removível.", specs: { Capacidade: "5.5L", Programas: "10", "Temp. máx.": "200°C", Potência: "1700W", Timer: "60 min" }, colors: ["Preto", "Inox"] },
        { title: "Umidificador Ultrassônico 3L", brand: "FreshAir", price: 139.9, oldPrice: 199.9, discount: 30, rating: 4.4, reviewCount: 765, store: "mercado_livre", shippingText: "Chega em 2 dias", tags: ["umidificador", "ultrassônico", "casa"], description: "Umidificador silencioso com reservatório de 3L, difusor de aromas, LED noturno e desligamento automático.", specs: { Capacidade: "3L", Tecnologia: "Ultrassônico", "Autonomia": "20h", "Nível ruído": "30dB", Extras: "Aromaterapia, LED" } },
        { title: "Ventilador de Torre Silencioso", brand: "BreezePro", price: 329.9, oldPrice: 459.9, discount: 28, rating: 4.5, reviewCount: 543, store: "amazon", shippingText: "Frete grátis", tags: ["ventilador", "torre", "silencioso"], description: "Ventilador torre de 96cm com 3 velocidades, oscilação de 90°, timer de 12h e controle remoto.", specs: { Altura: "96cm", Velocidades: "3", Oscilação: "90°", Timer: "12h", Controle: "Remoto incluso" } },
        { title: "Balança Digital de Cozinha", brand: "CookFast", price: 59.9, oldPrice: 89.9, discount: 33, rating: 4.6, reviewCount: 4321, store: "mercado_livre", shippingText: "Chega amanhã", tags: ["balança", "cozinha", "digital"], description: "Balança de precisão com capacidade de 10kg, tara automática, display LCD e superfície em aço inox.", specs: { Capacidade: "10kg", Precisão: "1g", Display: "LCD retroiluminado", Material: "Aço inox", Alimentação: "2x AAA" } },
      ],
    },
    {
      category: "moda",
      items: [
        { title: "Tênis Esportivo Running Ultra Leve", brand: "StepFlex", price: 279.9, oldPrice: 399.9, discount: 30, rating: 4.6, reviewCount: 2345, store: "amazon", shippingText: "Frete grátis", tags: ["tênis", "corrida", "esportivo"], description: "Tênis para corrida com entressola em espuma reativa, cabedal em malha respirável e sola de borracha com tração multidirecional.", specs: { Tipo: "Corrida/Caminhada", Entressola: "Espuma reativa", Cabedal: "Malha knit", Sola: "Borracha", Drop: "8mm" }, sizes: ["38", "39", "40", "41", "42", "43", "44"], colors: ["Preto/Branco", "Azul/Cinza", "Branco/Verde"] },
        { title: "Jaqueta Corta-Vento Impermeável", brand: "UrbanWear", price: 199.9, oldPrice: 329.9, discount: 39, rating: 4.5, reviewCount: 876, store: "mercado_livre", shippingText: "Frete grátis", tags: ["jaqueta", "impermeável", "corta-vento"], description: "Jaqueta leve impermeável com capuz retrátil, bolsos com zíper e costuras seladas. Ideal para trilhas e uso urbano.", specs: { Material: "Poliéster ripstop", Impermeabilidade: "10000mm", Peso: "280g", Capuz: "Retrátil", Bolsos: "3 com zíper" }, sizes: ["P", "M", "G", "GG", "XG"], colors: ["Preto", "Verde", "Azul Marinho"] },
        { title: "Mochila Executiva Antifurto 20L", brand: "UrbanWear", price: 189.9, oldPrice: 289.9, discount: 34, rating: 4.7, reviewCount: 1654, store: "amazon", shippingText: "Chega amanhã", tags: ["mochila", "antifurto", "notebook"], description: "Mochila com compartimento acolchoado para notebook até 15.6\", zíper oculto antifurto, porta USB e tecido impermeável.", specs: { Volume: "20L", Notebook: "Até 15.6\"", Material: "Oxford 900D", "Porta USB": "Sim", Impermeável: "Sim" }, colors: ["Preto", "Cinza Escuro"] },
        { title: "Relógio Analógico Clássico Couro", brand: "TimeCraft", price: 249.9, oldPrice: 399.9, discount: 38, rating: 4.4, reviewCount: 543, store: "mercado_livre", shippingText: "Frete grátis", tags: ["relógio", "analógico", "clássico"], description: "Relógio com caixa em aço inox 42mm, vidro safira, mecanismo japonês e pulseira em couro legítimo.", specs: { Caixa: "42mm aço inox", Vidro: "Safira", Mecanismo: "Quartzo japonês", "Resist. água": "5ATM", Pulseira: "Couro legítimo" }, colors: ["Marrom/Prata", "Preto/Dourado", "Azul/Prata"] },
        { title: "Camiseta Dry Fit Performance", brand: "StepFlex", price: 69.9, oldPrice: 99.9, discount: 30, rating: 4.3, reviewCount: 3456, store: "amazon", shippingText: "Chega em 2 dias", tags: ["camiseta", "dry fit", "esportiva"], description: "Camiseta em tecido dry fit com proteção UV50+, costuras planas antiatrito e modelagem regular.", specs: { Tecido: "Poliéster dry fit", "Proteção UV": "UPF 50+", Costura: "Plana antiatrito", Modelagem: "Regular fit", Lavagem: "Máquina" }, sizes: ["P", "M", "G", "GG", "XG"], colors: ["Preto", "Branco", "Cinza", "Azul"] },
        { title: "Calça Jogger Moletom Premium", brand: "UrbanWear", price: 149.9, oldPrice: 219.9, discount: 32, rating: 4.5, reviewCount: 1234, store: "mercado_livre", shippingText: "Frete grátis", tags: ["calça", "jogger", "moletom"], description: "Calça jogger em moletom peluciado 280g, punhos canelados, bolsos com zíper e cós com cordão.", specs: { Tecido: "Moletom peluciado 280g", Bolsos: "2 laterais com zíper", Cós: "Elástico com cordão", Punho: "Canelado", Modelagem: "Regular" }, sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Cinza Mescla", "Azul Marinho"] },
        { title: "Óculos de Sol Polarizado UV400", brand: "VisionStyle", price: 129.9, oldPrice: 199.9, discount: 35, rating: 4.6, reviewCount: 2100, store: "amazon", shippingText: "Chega amanhã", tags: ["óculos", "sol", "polarizado"], description: "Óculos com lentes polarizadas UV400, armação em TR90 ultraleve e dobradiças flex.", specs: { Lente: "Polarizada UV400", Armação: "TR90", Dobradiça: "Flex", Peso: "22g", Inclui: "Case + flanela" }, colors: ["Preto/Cinza", "Tartaruga/Marrom", "Azul/Espelhado"] },
        { title: "Carteira Slim Couro Legítimo", brand: "TimeCraft", price: 89.9, oldPrice: 149.9, discount: 40, rating: 4.4, reviewCount: 1876, store: "mercado_livre", shippingText: "Chega em 2 dias", tags: ["carteira", "couro", "slim"], description: "Carteira slim em couro legítimo com bloqueio RFID, 6 slots para cartão, compartimento para cédulas e porta CNH.", specs: { Material: "Couro legítimo", Proteção: "RFID blocking", Cartões: "6 slots", Extras: "Porta CNH, cédulas", Dimensões: "11x8.5x1cm" }, colors: ["Marrom", "Preto", "Café"] },
        { title: "Boné Trucker Ajustável", brand: "UrbanWear", price: 59.9, oldPrice: 89.9, discount: 33, rating: 4.2, reviewCount: 2543, store: "amazon", shippingText: "Chega amanhã", tags: ["boné", "trucker", "ajustável"], description: "Boné trucker com aba curva, tela respirável na parte traseira e fecho snapback ajustável.", specs: { Material: "Algodão + tela", Aba: "Curva", Fechamento: "Snapback", Tamanho: "Único ajustável", Lavagem: "Manual" }, colors: ["Preto", "Marinho", "Verde Militar", "Branco"] },
        { title: "Chinelo Slide Confort Anatômico", brand: "StepFlex", price: 79.9, oldPrice: 119.9, discount: 33, rating: 4.5, reviewCount: 4321, store: "mercado_livre", shippingText: "Frete grátis", tags: ["chinelo", "slide", "conforto"], description: "Chinelo slide com palmilha anatômica em EVA de dupla densidade e tira acolchoada.", specs: { Palmilha: "EVA anatômico", Tira: "Acolchoada", Solado: "Borracha antiderrapante", Peso: "180g (par)", Indicação: "Casual / Recovery" }, sizes: ["37/38", "39/40", "41/42", "43/44"], colors: ["Preto", "Branco", "Cinza"] },
        { title: "Cinto de Couro Reversível", brand: "TimeCraft", price: 99.9, oldPrice: 159.9, discount: 38, rating: 4.3, reviewCount: 876, store: "amazon", shippingText: "Chega em 2 dias", tags: ["cinto", "couro", "reversível"], description: "Cinto em couro legítimo reversível (preto/marrom) com fivela giratória clássica.", specs: { Material: "Couro legítimo", Tipo: "Reversível", Fivela: "Giratória em metal", Largura: "3.5cm", Tamanhos: "90-120cm" }, colors: ["Preto/Marrom"] },
      ],
    },
    {
      category: "livros",
      items: [
        { title: "O Poder do Hábito: Transforme sua Vida", brand: "Editora Nexus", price: 34.9, oldPrice: 54.9, discount: 36, rating: 4.8, reviewCount: 8765, store: "amazon", shippingText: "Chega amanhã", tags: ["autoajuda", "hábitos", "bestseller"], description: "Descubra como os hábitos funcionam e aprenda a transformá-los para melhorar sua produtividade, saúde e relacionamentos. Best-seller internacional com mais de 5 milhões de cópias vendidas.", specs: { Páginas: "368", Editora: "Nexus", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-001-1" } },
        { title: "Introdução à Programação com Python", brand: "Editora TechBooks", price: 69.9, oldPrice: 99.9, discount: 30, rating: 4.7, reviewCount: 2345, store: "mercado_livre", shippingText: "Frete grátis", tags: ["programação", "python", "tecnologia"], description: "Guia completo para iniciantes em programação usando Python. Inclui exercícios práticos e projetos para consolidar o aprendizado.", specs: { Páginas: "456", Editora: "TechBooks", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-002-8" } },
        { title: "A Sutil Arte de Ligar o F*da-se", brand: "Editora Intrínseca", price: 29.9, oldPrice: 49.9, discount: 40, rating: 4.6, reviewCount: 12340, store: "amazon", shippingText: "Chega amanhã", tags: ["autoajuda", "mindset", "bestseller"], description: "Uma abordagem diferente sobre como viver melhor focando no que realmente importa. Linguagem direta e sem rodeios.", specs: { Páginas: "224", Editora: "Intrínseca", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-003-5" } },
        { title: "Sapiens: Uma Breve História da Humanidade", brand: "Editora Nexus", price: 44.9, oldPrice: 69.9, discount: 36, rating: 4.9, reviewCount: 6543, store: "mercado_livre", shippingText: "Frete grátis", tags: ["história", "ciência", "bestseller"], description: "Uma viagem fascinante pela história da humanidade, desde os primeiros humanos até a era digital.", specs: { Páginas: "472", Editora: "Nexus", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-004-2" } },
        { title: "Design Patterns com TypeScript", brand: "Editora TechBooks", price: 79.9, oldPrice: 119.9, discount: 33, rating: 4.5, reviewCount: 876, store: "amazon", shippingText: "Chega em 2 dias", tags: ["programação", "typescript", "design patterns"], description: "Aprenda os 23 padrões de projeto clássicos do GoF implementados em TypeScript moderno com exemplos práticos.", specs: { Páginas: "384", Editora: "TechBooks", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-005-9" } },
        { title: "Mindset: A Nova Psicologia do Sucesso", brand: "Editora Objetiva", price: 39.9, oldPrice: 59.9, discount: 33, rating: 4.7, reviewCount: 5432, store: "mercado_livre", shippingText: "Frete grátis", tags: ["psicologia", "mindset", "autoajuda"], description: "Como a forma como pensamos influencia nosso sucesso. Aprenda a diferença entre mentalidade fixa e de crescimento.", specs: { Páginas: "320", Editora: "Objetiva", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-006-6" } },
        { title: "Pai Rico, Pai Pobre", brand: "Editora Alta Books", price: 37.9, oldPrice: 54.9, discount: 31, rating: 4.6, reviewCount: 9876, store: "amazon", shippingText: "Chega amanhã", tags: ["finanças", "investimento", "bestseller"], description: "O clássico sobre educação financeira que ensina lições valiosas sobre dinheiro, investimento e independência financeira.", specs: { Páginas: "336", Editora: "Alta Books", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-007-3" } },
        { title: "Clean Code: Código Limpo", brand: "Editora TechBooks", price: 74.9, oldPrice: 109.9, discount: 32, rating: 4.8, reviewCount: 3456, store: "mercado_livre", shippingText: "Frete grátis", tags: ["programação", "boas práticas", "software"], description: "O guia definitivo para escrever código limpo e manutenível. Princípios, padrões e práticas de desenvolvimento ágil.", specs: { Páginas: "432", Editora: "TechBooks", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-008-0" } },
        { title: "O Homem Mais Rico da Babilônia", brand: "Editora HarperCollins", price: 24.9, oldPrice: 39.9, discount: 38, rating: 4.7, reviewCount: 7654, store: "amazon", shippingText: "Chega amanhã", tags: ["finanças", "clássico", "parábolas"], description: "Parábolas que ensinam os princípios fundamentais da riqueza. Um clássico da literatura financeira.", specs: { Páginas: "160", Editora: "HarperCollins", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-009-7" } },
        { title: "Atomic Habits: Hábitos Atômicos", brand: "Editora Alta Life", price: 42.9, oldPrice: 64.9, discount: 34, rating: 4.9, reviewCount: 11230, store: "mercado_livre", shippingText: "Frete grátis", tags: ["autoajuda", "hábitos", "produtividade"], description: "Pequenas mudanças que geram resultados extraordinários. Um método comprovado para criar bons hábitos e se livrar dos maus.", specs: { Páginas: "320", Editora: "Alta Life", Idioma: "Português", Formato: "Brochura", ISBN: "978-85-0000-010-3" } },
      ],
    },
    {
      category: "beleza",
      items: [
        { title: "Kit Skincare Anti-Idade 5 Passos", brand: "GlowLab", price: 189.9, oldPrice: 289.9, discount: 35, rating: 4.7, reviewCount: 1234, store: "amazon", shippingText: "Frete grátis", tags: ["skincare", "anti-idade", "kit"], description: "Kit completo com limpador, tônico, sérum vitamina C, hidratante com ácido hialurônico e protetor solar FPS 50.", specs: { Itens: "5 produtos", "Tipo pele": "Todos os tipos", Ingredientes: "Vit. C, Ác. Hialurônico", FPS: "50 PA+++", Vegano: "Sim" } },
        { title: "Secador de Cabelo Profissional 2200W", brand: "HairPro", price: 229.9, oldPrice: 349.9, discount: 34, rating: 4.6, reviewCount: 2345, store: "mercado_livre", shippingText: "Frete grátis", tags: ["secador", "profissional", "cabelo"], description: "Secador profissional com motor AC, tecnologia iônica, 2 velocidades, 3 temperaturas e bico concentrador.", specs: { Potência: "2200W", Motor: "AC profissional", Tecnologia: "Iônica", Velocidades: "2", Temperaturas: "3 + frio" }, colors: ["Preto", "Rose Gold"] },
        { title: "Paleta de Sombras 18 Cores Matte & Shimmer", brand: "BeautyBox", price: 79.9, oldPrice: 129.9, discount: 38, rating: 4.5, reviewCount: 3456, store: "amazon", shippingText: "Chega amanhã", tags: ["maquiagem", "sombra", "paleta"], description: "Paleta com 18 cores em acabamentos matte, shimmer e glitter. Alta pigmentação e longa duração.", specs: { Cores: "18", Acabamentos: "Matte, Shimmer, Glitter", Peso: "22.5g", "Longa duração": "12h", "Cruelty free": "Sim" } },
        { title: "Perfume Eau de Parfum Feminino 100ml", brand: "Essence", price: 159.9, oldPrice: 249.9, discount: 36, rating: 4.8, reviewCount: 987, store: "mercado_livre", shippingText: "Frete grátis", tags: ["perfume", "feminino", "eau de parfum"], description: "Fragrância floral oriental com notas de jasmim, baunilha e sândalo. Fixação de até 8 horas.", specs: { Volume: "100ml", Concentração: "Eau de Parfum", "Notas saída": "Bergamota, Pêra", "Notas coração": "Jasmim, Rosa", "Notas fundo": "Baunilha, Sândalo" } },
        { title: "Chapinha Profissional Titânio 230°C", brand: "HairPro", price: 179.9, oldPrice: 279.9, discount: 36, rating: 4.5, reviewCount: 1876, store: "amazon", shippingText: "Chega em 2 dias", tags: ["chapinha", "prancha", "cabelo"], description: "Prancha com placas de titânio flutuantes, temperatura até 230°C, bivolt automático e aquecimento em 30 segundos.", specs: { Placas: "Titânio flutuantes", "Temp. máx.": "230°C", Voltagem: "Bivolt automático", Aquecimento: "30 segundos", Display: "LCD digital" }, colors: ["Preto", "Roxo"] },
        { title: "Kit Barba Completo 6 Peças", brand: "BarberShop", price: 119.9, oldPrice: 189.9, discount: 37, rating: 4.4, reviewCount: 1543, store: "mercado_livre", shippingText: "Frete grátis", tags: ["barba", "grooming", "kit"], description: "Kit com óleo para barba, balm, shampoo, pente de madeira, tesoura e necessaire. Fragrância amadeirada.", specs: { Itens: "6 peças", Fragrância: "Amadeirada", "Óleo": "30ml", Balm: "60g", Shampoo: "140ml" } },
        { title: "Escova Elétrica de Limpeza Facial", brand: "GlowLab", price: 149.9, oldPrice: 229.9, discount: 35, rating: 4.6, reviewCount: 876, store: "amazon", shippingText: "Chega amanhã", tags: ["limpeza facial", "escova", "skincare"], description: "Escova com 4 velocidades, cerdas de silicone, resistente à água IPX7 e carregamento por indução.", specs: { Velocidades: "4", Material: "Silicone médico", Proteção: "IPX7", Carregamento: "Indução", Bateria: "90 dias" }, colors: ["Rosa", "Branco", "Menta"] },
        { title: "Protetor Solar Facial FPS 60 Toque Seco", brand: "SunShield", price: 49.9, oldPrice: 79.9, discount: 38, rating: 4.7, reviewCount: 5432, store: "mercado_livre", shippingText: "Chega amanhã", tags: ["protetor solar", "facial", "toque seco"], description: "Protetor solar facial com FPS 60 e toque seco. Não deixa residuo branco e controla oleosidade por até 12h.", specs: { FPS: "60", FPUVA: "22", Acabamento: "Toque seco matte", Volume: "50g", "Controle oleosidade": "12h" } },
        { title: "Creme Hidratante Corporal 400ml", brand: "GlowLab", price: 39.9, oldPrice: 59.9, discount: 33, rating: 4.5, reviewCount: 3210, store: "amazon", shippingText: "Chega em 2 dias", tags: ["hidratante", "corporal", "pele seca"], description: "Hidratante corporal com manteiga de karité e ácido hialurônico. Absorção rápida e hidratação por 48h.", specs: { Volume: "400ml", Ingredientes: "Karité, Ác. Hialurônico", Hidratação: "48h", Fragrância: "Suave floral", Vegano: "Sim" } },
        { title: "Kit Esmaltes Gel Semipermanente 12 Cores", brand: "NailArt", price: 99.9, oldPrice: 159.9, discount: 37, rating: 4.3, reviewCount: 2100, store: "mercado_livre", shippingText: "Frete grátis", tags: ["esmalte", "gel", "unhas"], description: "Kit com 12 esmaltes em gel semipermanente, base, top coat e cabine UV/LED compacta. Duração de até 21 dias.", specs: { Itens: "14 (12 cores + base + top)", Duração: "Até 21 dias", Cabine: "UV/LED 48W", Secagem: "60 segundos", "Cruelty free": "Sim" } },
      ],
    },
    {
      category: "games",
      items: [
        { title: "Controle Sem Fio Pro Gaming", brand: "GameZone", price: 349.9, oldPrice: 499.9, discount: 30, rating: 4.8, reviewCount: 2345, store: "amazon", shippingText: "Frete grátis", tags: ["controle", "wireless", "gaming"], description: "Controle sem fio com gatilhos adaptativos, feedback háptico avançado, bateria de 40h e compatível com PC e consoles.", specs: { Conectividade: "Bluetooth 5.1 + USB-C", Bateria: "40 horas", Gatilhos: "Adaptativos", Feedback: "Háptico dual", Compatível: "PC, PS5, Switch" }, colors: ["Preto", "Branco", "Azul Cósmico"] },
        { title: "Headset Gamer 7.1 Surround RGB", brand: "GameZone", price: 259.9, oldPrice: 399.9, discount: 35, rating: 4.6, reviewCount: 1876, store: "mercado_livre", shippingText: "Frete grátis", tags: ["headset", "gamer", "7.1 surround"], description: "Headset com áudio 7.1 surround virtual, microfone retrátil com cancelamento de ruído, drivers de 50mm e almofadas em memory foam.", specs: { Áudio: "7.1 Virtual Surround", Drivers: "50mm", Microfone: "Retrátil + Noise Cancel", Conforto: "Memory foam", Iluminação: "RGB" }, colors: ["Preto", "Branco/Ciano"] },
        { title: "Mousepad Gamer XXL 90x40cm", brand: "GameZone", price: 89.9, oldPrice: 139.9, discount: 35, rating: 4.7, reviewCount: 3456, store: "amazon", shippingText: "Chega amanhã", tags: ["mousepad", "gamer", "XXL"], description: "Mousepad extended com superfície speed, base antiderrapante, bordas costuradas e impermeável.", specs: { Tamanho: "90x40cm", Espessura: "4mm", Superfície: "Speed (micro textura)", Base: "Borracha antiderrapante", Bordas: "Costuradas" } },
        { title: "Cadeira Gamer Ergonômica Reclinável", brand: "ProSeat", price: 1299.9, oldPrice: 1899.9, discount: 32, rating: 4.5, reviewCount: 987, store: "mercado_livre", shippingText: "Frete grátis", tags: ["cadeira", "gamer", "ergonômica"], description: "Cadeira gamer com encosto reclinável até 180°, apoio lombar ajustável, braços 4D e base giratória reforçada.", specs: { Reclinação: "Até 180°", Braços: "4D ajustáveis", "Peso suportado": "150kg", Material: "Couro PU premium", Extras: "Almofada lombar + cervical" }, colors: ["Preto/Vermelho", "Preto/Azul", "Preto/Branco"] },
        { title: "Placa de Captura de Vídeo 4K", brand: "StreamPro", price: 599.9, oldPrice: 849.9, discount: 29, rating: 4.6, reviewCount: 432, store: "amazon", shippingText: "Chega em 2 dias", tags: ["captura", "streaming", "4K"], description: "Placa de captura externa USB-C com passthrough 4K@60fps e captura 1080p@60fps. Compatível com OBS e principais softwares.", specs: { Passthrough: "4K@60fps", Captura: "1080p@60fps", Conexão: "USB-C 3.0", Compatível: "PC, Mac, OBS", Latência: "Ultra baixa" } },
        { title: "Webcam Streaming 2K com Ring Light", brand: "StreamPro", price: 299.9, oldPrice: 449.9, discount: 33, rating: 4.4, reviewCount: 765, store: "mercado_livre", shippingText: "Frete grátis", tags: ["webcam", "streaming", "ring light"], description: "Webcam 2K com ring light integrada de 3 tons, foco automático, microfone duplo e montagem ajustável.", specs: { Resolução: "2K 1440p", "Ring light": "3 tons, 5 brilhos", Foco: "Automático", Microfone: "Duplo estéreo", "Campo visão": "95°" } },
        { title: "SSD NVMe 1TB PCIe Gen4", brand: "SpeedDrive", price: 449.9, oldPrice: 649.9, discount: 31, rating: 4.8, reviewCount: 2100, store: "amazon", shippingText: "Chega amanhã", tags: ["SSD", "NVMe", "armazenamento"], description: "SSD M.2 NVMe com leitura de 7000MB/s, gravação de 5500MB/s e TBW de 600TB. Ideal para gaming e edição.", specs: { Capacidade: "1TB", Interface: "PCIe Gen4 x4", Leitura: "7000MB/s", Gravação: "5500MB/s", TBW: "600TB" } },
        { title: "Suporte Duplo para Monitor Articulado", brand: "DeskPro", price: 199.9, oldPrice: 299.9, discount: 33, rating: 4.5, reviewCount: 876, store: "mercado_livre", shippingText: "Frete grátis", tags: ["suporte", "monitor", "ergonomia"], description: "Suporte articulado para 2 monitores de 17-32\", braços em alumínio, rotação 360° e gerenciamento de cabos.", specs: { Monitores: "2 (17-32\")", "Peso suportado": "9kg cada", Rotação: "360°", Material: "Alumínio", VESA: "75x75/100x100mm" } },
        { title: "Microfone Condensador USB Cardioide", brand: "StreamPro", price: 279.9, oldPrice: 399.9, discount: 30, rating: 4.7, reviewCount: 1543, store: "amazon", shippingText: "Frete grátis", tags: ["microfone", "condensador", "streaming"], description: "Microfone condensador USB com padrão cardioide, taxa de amostragem 96kHz/24bit, botão mute e controle de ganho.", specs: { Tipo: "Condensador", Padrão: "Cardioide", "Freq. resp.": "20Hz-20kHz", "Amostragem": "96kHz/24bit", Conexão: "USB-C" } },
        { title: "Kit Iluminação LED para Setup", brand: "LightUp", price: 149.9, oldPrice: 229.9, discount: 35, rating: 4.3, reviewCount: 2100, store: "mercado_livre", shippingText: "Chega em 2 dias", tags: ["LED", "iluminação", "setup"], description: "Fita LED RGB 5m com controladora WiFi, 16 milhões de cores, sincronização com música e controle por app.", specs: { Comprimento: "5m", LEDs: "300 RGB", Controle: "App + WiFi", Cores: "16 milhões", Extras: "Sync música" } },
      ],
    },
    {
      category: "acessorios",
      items: [
        { title: "Suporte para Notebook Ajustável Alumínio", brand: "DeskPro", price: 149.9, oldPrice: 229.9, discount: 35, rating: 4.6, reviewCount: 1876, store: "amazon", shippingText: "Chega amanhã", tags: ["suporte", "notebook", "ergonomia"], description: "Suporte em alumínio com 7 ângulos de ajuste, dobrável e compatível com notebooks de 10 a 17 polegadas.", specs: { Material: "Alumínio aeronáutico", Ângulos: "7 posições", Compatível: "10-17\"", "Peso suportado": "20kg", Dobrável: "Sim" }, colors: ["Prata", "Cinza Espacial"] },
        { title: "Garrafa Térmica Inox 750ml", brand: "HydroFlask", price: 89.9, oldPrice: 139.9, discount: 35, rating: 4.7, reviewCount: 3456, store: "mercado_livre", shippingText: "Frete grátis", tags: ["garrafa", "térmica", "inox"], description: "Garrafa térmica em aço inox dupla parede, mantém gelado por 24h e quente por 12h. Tampa com trava e boca larga.", specs: { Capacidade: "750ml", Material: "Aço inox 18/8", Gelado: "24 horas", Quente: "12 horas", Tampa: "Trava rosqueável" }, colors: ["Preto", "Branco", "Azul", "Verde"] },
        { title: "Organizador de Cabos e Fios Magnético", brand: "CablePro", price: 39.9, oldPrice: 69.9, discount: 43, rating: 4.4, reviewCount: 2345, store: "amazon", shippingText: "Chega amanhã", tags: ["organizador", "cabos", "magnético"], description: "Organizador magnético para mesa com 5 clips para cabos de diferentes espessuras. Base adesiva 3M.", specs: { Clips: "5 unidades", Fixação: "Magnético + 3M", Compatível: "1-5mm diâmetro", Material: "Silicone + ímã", Instalação: "Adesivo" } },
        { title: "Suporte Celular Carro com Carregamento", brand: "TechFit", price: 99.9, oldPrice: 159.9, discount: 38, rating: 4.5, reviewCount: 1654, store: "mercado_livre", shippingText: "Chega em 2 dias", tags: ["suporte", "carro", "celular", "carregador"], description: "Suporte veicular com carregamento wireless 15W, sensor de proximidade para abrir/fechar e fixação no ar condicionado.", specs: { Carregamento: "15W wireless Qi", Sensor: "Proximidade", Fixação: "Ar condicionado + ventosa", Compatível: "4.7-6.8\"", Rotação: "360°" } },
        { title: "Mala de Viagem Rígida 20\" Bordo", brand: "TravelPro", price: 349.9, oldPrice: 549.9, discount: 36, rating: 4.6, reviewCount: 876, store: "amazon", shippingText: "Frete grátis", tags: ["mala", "viagem", "bordo"], description: "Mala de bordo em ABS com 4 rodas 360°, cadeado TSA integrado, interior organizado e alça telescópica.", specs: { Tamanho: "20\" (bordo)", Material: "ABS texturizado", Rodas: "4 giratórias 360°", Cadeado: "TSA integrado", Peso: "3.2kg" }, colors: ["Preto", "Azul Marinho", "Rose Gold"] },
        { title: "Necessaire de Viagem Organizadora", brand: "TravelPro", price: 69.9, oldPrice: 109.9, discount: 36, rating: 4.3, reviewCount: 2100, store: "mercado_livre", shippingText: "Chega amanhã", tags: ["necessaire", "viagem", "organizador"], description: "Necessaire com divisórias internas, gancho para pendurar, impermeável e bolso em tela para visualização.", specs: { Material: "Nylon impermeável", Compartimentos: "6 divisórias", Gancho: "Pendurar", Dimensões: "24x18x10cm", Lavável: "Sim" }, colors: ["Preto", "Cinza", "Azul"] },
        { title: "Fone TWS com Estojo de Carregamento", brand: "SoundWave", price: 159.9, oldPrice: 249.9, discount: 36, rating: 4.5, reviewCount: 4321, store: "amazon", shippingText: "Chega amanhã", tags: ["fone", "TWS", "bluetooth"], description: "Fone true wireless com ANC, transparência, 30h de bateria total, certificação IPX5 e controle touch.", specs: { ANC: "Cancelamento ativo", Bateria: "8h + 22h (estojo)", Proteção: "IPX5", Bluetooth: "5.3", Driver: "12mm" }, colors: ["Preto", "Branco", "Bege"] },
        { title: "Porta-Cartões Metal RFID Blocking", brand: "TimeCraft", price: 49.9, oldPrice: 89.9, discount: 44, rating: 4.4, reviewCount: 3210, store: "mercado_livre", shippingText: "Chega em 2 dias", tags: ["porta-cartões", "RFID", "metal"], description: "Porta-cartões em alumínio com bloqueio RFID, mecanismo pop-up e capacidade para até 6 cartões.", specs: { Material: "Alumínio anodizado", Capacidade: "6 cartões", Proteção: "RFID/NFC", Mecanismo: "Pop-up", Peso: "65g" }, colors: ["Prata", "Preto", "Rose Gold", "Azul"] },
        { title: "Adaptador Universal de Tomada Viagem", brand: "TravelPro", price: 79.9, oldPrice: 129.9, discount: 38, rating: 4.6, reviewCount: 1543, store: "amazon", shippingText: "Chega em 2 dias", tags: ["adaptador", "tomada", "viagem"], description: "Adaptador universal com 4 portas USB, USB-C PD 30W, compatível com mais de 150 países e fusível de segurança.", specs: { "USB-A": "3 portas", "USB-C": "1 porta 30W PD", Países: "150+", Fusível: "Segurança", Voltagem: "100-250V" } },
        { title: "Almofada de Viagem Memory Foam", brand: "TravelPro", price: 59.9, oldPrice: 99.9, discount: 40, rating: 4.5, reviewCount: 2876, store: "mercado_livre", shippingText: "Frete grátis", tags: ["almofada", "viagem", "memory foam"], description: "Almofada cervical em memory foam com suporte ergonômico, capa removível lavável e bolsa de transporte.", specs: { Material: "Memory foam", Capa: "Removível lavável", Suporte: "Ergonômico cervical", Inclui: "Bolsa transporte", Peso: "280g" }, colors: ["Cinza", "Azul", "Preto"] },
      ],
    },
  ];

  for (const cat of data) {
    for (const item of cat.items) {
      const p: Product = {
        ...item,
        id: `prod-${String(id).padStart(3, "0")}`,
        category: cat.category,
        sku: `VP-${cat.category.substring(0, 3).toUpperCase()}-${String(id).padStart(4, "0")}`,
        images: [`/placeholder.svg`],
        affiliateUrl: storeUrls[item.store],
      };
      products.push(p);
      id++;
    }
  }
  return products;
}

export const products: Product[] = generateProducts();

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getTopDeals(limit = 8): Product[] {
  return [...products].sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, limit);
}

export function getBestSellers(limit = 8): Product[] {
  return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit);
}

export function getTopRated(limit = 8): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}
