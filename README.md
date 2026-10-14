# Política sem Gritos — leia, compare, decida

Site que compara, lado a lado e com o mesmo tratamento, as propostas de Lula e Flávio
Bolsonaro para o 2º turno de 2026. Cada proposta traz a página do plano de governo
registrado no TSE. Não há nota para candidato nem recomendação de voto.

## Rodar e publicar

```bash
npm install
npm start            # desenvolvimento, em http://localhost:4200
npm run build        # gera o site estático em dist/politica-sem-gritos/browser
npm run test:dados   # confere as regras editoriais dos dados
```

O `build` já gera o HTML pronto (pré-renderização), o que faz a prévia do link
funcionar no WhatsApp e nas redes. A pasta `dist/politica-sem-gritos/browser` pode ir para
qualquer hospedagem de site estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

O site no ar, em politicasemgrito.com.br, sai pela Cloudflare: o `wrangler.jsonc` diz qual pasta
publicar e liga o domínio e o www. Com o repositório conectado na Cloudflare (Workers Builds),
cada mudança que entra na `main` publica sozinha em cerca de um minuto, com build `npm run build`
e deploy `npx wrangler deploy`.

O teste usa um navegador sem janela. No Windows sem Chrome instalado, aponte para o
Edge antes de rodar: `CHROME_BIN="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"`.

## Onde fica cada coisa

| Arquivo | O que tem |
|---|---|
| `src/app/temas.ts` | Os 14 temas: propostas (com página do plano), análise e o que acompanhar |
| `src/app/data.ts` | Candidatos, 1º turno, Congresso, cenários, gráficos, regras e perguntas para IA |
| `src/app/fontes.ts` | Todas as fontes citadas e a data de revisão (`UPDATED_AT`) |
| `src/app/models.ts` | Formato dos dados |
| `src/app/app.html` / `app.ts` | A página |
| `src/app/estilos/` | Estilos por parte da página (o `app.scss` só junta os arquivos, em ordem) |
| `src/app/paper-stack.ts` | Componente dos cards de papel (folha, jornal, post-it, liso) |
| `public/` | Imagens, ícones e a imagem de prévia do link |

## Regras editoriais (o teste `test:dados` cobra parte delas)

- Toda informação tem fonte; toda proposta do plano tem a página do PDF do TSE.
- Os dois candidatos têm o mesmo número de propostas em cada tema e a mesma estrutura de análise.
- Fato, proposta e análise aparecem com etiquetas diferentes.
- Verde, amarelo e azul são cores do país, nunca de candidato ou partido.

## Licença e contribuições

Projeto de **Simone Auler**. O código está sob a [licença MIT](LICENSE): qualquer pessoa pode
ler, copiar e reaproveitar, desde que mantenha o aviso de autoria. Fotos, planos de governo e
dados oficiais pertencem a quem os publicou e seguem os termos de cada fonte (créditos no site).

Correções e sugestões são bem-vindas: abra uma *issue* ou envie um *pull request*. Toda
mudança passa pela revisão da autora antes de entrar no site.
