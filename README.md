# NEXO — ULTRA PRIME

Interface premium para o **NEXO — Agente Acadêmico**. Preserva integralmente a base de conteúdo do HTML original: **8 matérias, 114 aulas, exercícios, gabaritos, conceitos, explicações, passos e dicas**.

## Como abrir

Abra `index.html` no navegador. Mantenha a pasta `assets/` junto do arquivo. A interface, os conteúdos e as animações funcionam sem internet. Apenas as fontes remotas usam Google Fonts quando houver conexão; caso não haja, o site utiliza fontes do sistema. O progresso fica no armazenamento local do navegador.

## Como publicar no GitHub Pages

1. Crie um repositório público em https://github.com/new — sugestão de nome: `nexo-agente-academico`.
2. Envie `index.html` e a pasta `assets/` para a raiz do repositório (não apenas o ZIP).
3. Vá em **Settings → Pages → Build and deployment** e selecione **Deploy from a branch**, branch `main` e pasta `/(root)`.
4. Aguarde o GitHub Pages disponibilizar a URL no painel de Pages.

## Recursos

- Hero orbital com aurora animada, partículas e meteoros discretos.
- Interface responsiva com glassmorphism, gradientes e profundidade.
- Dashboard animado com aulas totais/concluídas.
- Carrossel com destaque por matéria e gestos de arraste.
- Busca global Ctrl+K (ou `/`) com ↑ ↓ e Enter.
- Botão de retomar atividade recente (via armazenamento local).
- Modo foco na leitura de respostas.
- Navegação alternativa com Alt+← e Alt+→ entre atividades.
- Acessibilidade: foco visível, rótulos, preferência de movimento reduzido.
- Progresso salvo no `localStorage` **sob a mesma chave do original**: `nexo_completed_v1`.

## Estrutura

- `index.html`: interface e base completa de conteúdo do arquivo original, intacta.
- `assets/tailwind-local.css`: utilitários CSS compilados localmente.
- `assets/premium.css`: identidade visual / responsividade / animações.
- `assets/premium.js`: efeitos e melhorias de navegação.
- `assets/favicon.svg`: ícone vetorial.

## Tecnologias

HTML5, CSS3, JavaScript ES2022, Canvas 2D, SVG e Tailwind CSS compilado localmente (sem CDN). **Sem backend, login, banco remoto ou API de IA.** O agente NEXO permanece uma ferramenta local baseada nas respostas do material, e não uma IA online.