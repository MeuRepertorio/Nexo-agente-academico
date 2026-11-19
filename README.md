# NEXO — Reference Edition

Recriação da experiência visual conforme a imagem de referência enviada: fundo preto, malha geométrica, tipografia leve, cinco cartões centrais, ícones desfocados e iluminação branca.

## Conteúdo mantido

Os dados do projeto original foram preservados: 8 matérias, 114 aulas, atividades, respostas resumidas, explicações, passos e dicas. O progresso continua salvo localmente na mesma chave anterior `nexo_completed_v1`.

## Estrutura

- `index.html`: aplicação completa em arquivo único (HTML + CSS + JavaScript + SVG).
- `README.md`: instruções deste projeto.

**Não é necessário instalar ferramentas, baixar pacotes ou iniciar um servidor.** Abra `index.html` no navegador.

## Funcionalidades

Carrossel com oito disciplinas (cinco cartões visíveis em telas largas); navegação por setas e teclado; índice de aulas; atividades; respostas; copiar; marcar concluído; busca Ctrl+K; assistente NEXO local, sem IA remota.

A geometria do fundo é SVG estático e os pontos de luz usam animações CSS discretas; a tela não usa um renderizador Canvas de 60 FPS. A fonte Inter é carregada pela rede quando disponível, com fallback do sistema offline.

## GitHub Pages

Em **Settings → Pages**, selecione **Deploy from a branch → main → /(root)** e salve. O endereço será disponibilizado pelo GitHub quando a implantação finalizar.
