/**
 * Contar visitas sem guardar quem lê.
 *
 * A página manda um aviso (beacon) no primeiro gesto de quem lê: rolar, tocar, mover o mouse ou teclar.
 * Este Worker confere o aviso e repassa uma contagem ao receptor das landings da Primoia, que alimenta o
 * painel de visitas. Ele só roda em `/_trilha`; o resto do site sai direto dos arquivos.
 *
 * O que sai daqui: a rota, o TIPO de origem (busca, social, direto, interno ou outro, nunca o site),
 * o país, o tipo de aparelho e um identificador aleatório da página aberta. O user-agent é lido só para
 * aparelho e robô e depois descartado. O IP nem é lido. Sem cookie e sem nada guardado no aparelho.
 *
 * As regras de robô, aparelho, origem e sonda vêm da landing da Primoia (primoia-landing/src/worker/chegada.mjs).
 * Funções puras, testadas com `npm run test:worker`.
 */

export const VERSAO_FRONT = 'politica-sem-gritos';
export const MAX_AVISO_BYTES = 1024;

const ROBO =
  /bot\b|bot\/|crawl|spider|slurp|facebookexternalhit|embedly|preview|curl|wget|python|httpx|aiohttp|axios|go-http|java\/|okhttp|libwww|headless|lighthouse|pagespeed|monitor|uptime|scrap|semrush|ahrefs|mj12|petalbot|bytespider|gptbot|claudebot|perplexity|chatgpt|ccbot|whatsapp|telegram/i;

/** `sim` (se diz robô, ou não diz quem é), `provavel` (navegador sem idioma) ou `nao`. */
export function marcaDeRobo(ua, idioma) {
  if (!ua || ROBO.test(ua)) return 'sim';
  if (!idioma) return 'provavel';
  return 'nao';
}

export function aparelho(ua = '') {
  if (/ipad|tablet|android(?!.*mobile)/i.test(ua)) return 'tablet';
  if (/mobi|iphone|ipod|android/i.test(ua)) return 'celular';
  return 'computador';
}

/** As sondas da Primoia (blackbox, vigia, radar) se anunciam pelo user-agent ou pelo cabeçalho. */
const SONDA_UA = /^primoia-(vigia|radar|sonda)\b/i;

export function ehSonda(request) {
  return request.headers.has('x-primoia-sonda') || SONDA_UA.test(request.headers.get('user-agent') ?? '');
}

const BUSCA =
  /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|yahoo\.com|ecosia\.org|yandex\.[a-z]+|search\.brave\.com|baidu\.com|startpage\.com)$/;
const SOCIAL =
  /(^|\.)(facebook\.com|fb\.com|instagram\.com|t\.co|x\.com|twitter\.com|linkedin\.com|lnkd\.in|youtube\.com|whatsapp\.com|wa\.me|tiktok\.com|reddit\.com|pinterest\.com|threads\.net|t\.me|telegram\.org)$/;
const CASA = /(^|\.)politicasemgrito\.com\.br$/;
const DOMINIO = /^(?=.{1,80}$)[a-z0-9-]+(\.[a-z0-9-]+)+$/;
const INTERNO = /^(localhost|.*\.(local|internal|lan|home|intranet|localdomain))$/;
const SEGUNDO_NIVEL = /^(com|org|net|gov|edu|art|blog|med|psi|odo|co)$/;

/** Só o domínio registrado (aproximado: `blog.exemplo.com.br` → `exemplo.com.br`). IP e rede interna, nada. */
function dominioRegistrado(host) {
  if (!host || host.includes(':') || /^\d+(\.\d+){3}$/.test(host) || INTERNO.test(host)) return null;
  const partes = host.split('.');
  if (partes.length < 2) return null;
  const n =
    partes.length >= 3 && partes[partes.length - 1].length === 2 && SEGUNDO_NIVEL.test(partes[partes.length - 2]) ? 3 : 2;
  const dominio = partes.slice(-n).join('.');
  return DOMINIO.test(dominio) ? dominio : null;
}

/** De onde veio, só a categoria. O site de origem é usado para classificar e jogado fora. */
export function origem(host) {
  if (!host) return 'direto';
  const dominio = dominioRegistrado(host);
  if (!dominio) return 'outro';
  if (CASA.test(dominio)) return 'interno';
  if (BUSCA.test(dominio)) return 'busca';
  if (SOCIAL.test(dominio)) return 'social';
  return 'outro';
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const ROTA = /^\/[a-z0-9\-_/]{0,119}$/;
const HOST = /^[a-z0-9.-]{1,80}$/;

/** O aviso da página: `{vista, rota, de, teste}`. Qualquer outra forma é descartada. */
export function lerAviso(texto) {
  if (typeof texto !== 'string' || texto.length > MAX_AVISO_BYTES) return null;
  let corpo;
  try {
    corpo = JSON.parse(texto);
  } catch {
    return null;
  }
  if (!corpo || typeof corpo !== 'object') return null;
  const vista = typeof corpo.vista === 'string' ? corpo.vista.toLowerCase() : '';
  const rota = typeof corpo.rota === 'string' ? corpo.rota.toLowerCase().split(/[?#]/)[0] : '';
  const de = typeof corpo.de === 'string' ? corpo.de.toLowerCase() : null;
  if (!UUID.test(vista) || !ROTA.test(rota) || de === null || (de !== '' && !HOST.test(de))) return null;
  if (typeof corpo.teste !== 'boolean') return null;
  return { vista, rota, de, teste: corpo.teste };
}

/** Só aviso que veio da própria página, de gente, e não de sonda. */
export function avisoAceito(request) {
  if (request.method !== 'POST') return false;
  const tamanho = Number(request.headers.get('content-length') ?? 'NaN');
  if (!Number.isFinite(tamanho) || tamanho > MAX_AVISO_BYTES) return false;
  const site = request.headers.get('sec-fetch-site');
  if (site !== null && site !== 'same-origin') return false;
  const ua = request.headers.get('user-agent') ?? '';
  return marcaDeRobo(ua, request.headers.get('accept-language')) === 'nao' && !ehSonda(request);
}

/** O que vai ao receptor. Só estes campos: nada de site de origem, UF, cidade, rede, UTM ou IP. */
export function contagem(aviso, request, agora = new Date()) {
  const ts = agora.toISOString();
  const pais = request.cf?.country;
  const marcaDeTeste = aviso.teste ? { utm_source: 'teste' } : {};
  return {
    session_id: aviso.vista,
    dispositivo: aparelho(request.headers.get('user-agent') ?? ''),
    versao_front: VERSAO_FRONT,
    eventos: [
      {
        evento: 'landing_vista',
        ts,
        vista: aviso.vista,
        rota: aviso.rota,
        origem: origem(aviso.de),
        bot: 'nao',
        ...(typeof pais === 'string' && /^[A-Z]{2}$/.test(pais) ? { pais } : {}),
        ...marcaDeTeste,
      },
      { evento: 'landing_humano', ts, vista: aviso.vista, ...marcaDeTeste },
    ],
  };
}

async function repassa(env, corpo) {
  try {
    await fetch(env.TRILHA_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'X-Trilha-Landing': env.TRILHA_CHAVE },
      body: JSON.stringify(corpo),
    });
  } catch {
    // a contagem nunca atrapalha o site
  }
}

/** `POST /_trilha`: responde sempre 204. Só repassa o aviso que passou em tudo, e só com URL e chave. */
export async function recebeAviso(request, env, ctx) {
  if (env.TRILHA_URL && env.TRILHA_CHAVE && avisoAceito(request)) {
    const aviso = lerAviso(await request.text().catch(() => ''));
    if (aviso) ctx.waitUntil(repassa(env, contagem(aviso, request)));
  }
  return new Response(null, { status: 204 });
}
