# Atual Autopeças Sete Lagoas

Site institucional (landing page) da **Atual Autopeças — unidade Sete Lagoas/MG**. Apresenta as categorias de peças, as marcas trabalhadas, as vantagens da loja, avaliações de clientes e a localização, com chamadas para orçamento pelo WhatsApp ("Telezap").

É um site estático em HTML, CSS e JavaScript puros: não tem build, dependências nem framework.

🔗 **Site no ar:** [atualautopecassetelagoas.com.br](https://atualautopecassetelagoas.com.br/)

<!-- Coloque o print do site em docs/preview.png -->
![Prévia do site da Atual Autopeças](docs/preview.png)

## Estrutura

```
.
├── index.html              # Página única com todas as seções
├── css/
│   ├── styles.css          # Estilos do site (tokens de cor, layout, componentes)
│   ├── fonts.css           # @font-face das fontes locais (Archivo e Manrope)
│   └── vendor/             # Ícones Phosphor (estilos fill e duotone)
├── js/
│   └── main.js             # Comportamento da página e configuração de contato
└── assets/
    ├── fonts/              # Arquivos .woff2 das fontes e dos ícones
    └── img/                # Logo, fotos da loja e logos das marcas (img/marcas/)
```

### Seções da página

| Âncora         | Conteúdo                                              |
| -------------- | ----------------------------------------------------- |
| `#inicio`      | Hero com chamada para orçamento                       |
| `#produtos`    | Categorias de peças (cada card abre o WhatsApp)       |
| —              | Faixa de marcas em carrossel contínuo                 |
| —              | Vantagens da loja                                     |
| `#quemsomos`   | Sobre a empresa                                       |
| —              | Citação com efeito parallax                           |
| —              | Avaliações do Google em carrossel                     |
| —              | Galeria de fotos da loja                              |
| `#localizacao` | Endereço, telefone, horário, rota e mapa incorporado  |

## Rodando localmente

Basta abrir o `index.html` no navegador. Para servir por HTTP (recomendado, para o mapa e as fontes se comportarem como em produção):

```bash
python3 -m http.server 8000
# ou
npx serve .
```

E acesse `http://localhost:8000`.

## Manutenção

### Contato (WhatsApp e telefone)

O número e a mensagem padrão do WhatsApp ficam no objeto `CONFIG`, no topo de [js/main.js](js/main.js):

```js
const CONFIG = {
  whatsapp: '553137715755',
  phone: '(31) 3771-5755',
  whatsappMessage: 'Olá, vim pelo site e gostaria de um orçamento de peças.'
};
```

Ao carregar a página, o script atualiza todos os links com `data-whatsapp` e todos os textos com `data-phone`. Os valores escritos no HTML servem só de fallback caso o JavaScript não rode, então, ao trocar o número, vale atualizá-los também no `index.html`.

### Marcas

Os logos ficam em `assets/img/marcas/`. Para adicionar uma marca, coloque a imagem na pasta e inclua um `<li>` na lista `.brands__list` do `index.html`. O script duplica a lista sozinho para o carrossel girar sem emenda.

### Avaliações

Cada avaliação é um `<figure class="review">` dentro de `[data-reviews-track]` no `index.html`. Basta copiar um bloco existente e trocar texto, nome e inicial do avatar.

### Cores e tipografia

As cores, fontes e espaçamentos são variáveis CSS definidas em `:root`, no início de [css/styles.css](css/styles.css).

### Cache

O CSS e o JS são carregados com um parâmetro de versão (`styles.css?v=2`, `main.js?v=2`). Depois de alterar esses arquivos, aumente o número no `index.html` para que os visitantes não fiquem com a versão antiga em cache. O mesmo vale para imagens substituídas mantendo o nome (ex.: `hero.jpg?v=2`).

## Comportamentos em JavaScript

Todos ficam em [js/main.js](js/main.js) e são ligados por atributos `data-*`:

- `data-whatsapp` / `data-phone`: preenchimento dos links e do telefone a partir do `CONFIG`
- `data-marquee`: carrossel contínuo de marcas
- `data-reviews-track`, `data-reviews-prev`, `data-reviews-next`: carrossel de avaliações com avanço automático a cada 5 s (pausa com o mouse em cima)
- `data-reveal`: animação de entrada dos elementos ao rolar a página
- `data-parallax` / `data-parallax-layer`: parallax da faixa de citação (desativado com `prefers-reduced-motion`)
- Cabeçalho que ganha fundo após rolar a página (`.site-header.is-scrolled`)

## Analytics

A página inclui o **Google Tag Manager** (container `GTM-MLMTSBJJ`), no `<head>` e logo após a abertura do `<body>`.

---

Desenvolvido por Connect Dreams.
