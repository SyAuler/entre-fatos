/**
 * O Worker do site. Só `/_trilha` passa por aqui (`run_worker_first` no wrangler.jsonc); a página, as
 * imagens e o resto saem direto dos arquivos. Se o Worker passar do limite diário do plano, só a contagem
 * para: o site continua no ar.
 */
import { recebeAviso } from './trilha.mjs';

export default {
  async fetch(request, env, ctx) {
    if (new URL(request.url).pathname === '/_trilha') return recebeAviso(request, env, ctx);
    return env.ASSETS.fetch(request);
  },
};
