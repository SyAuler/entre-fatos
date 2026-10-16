// A contagem de visitas: o que entra, o que é descartado e o que sai para o receptor.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.mjs';
import { aparelho, lerAviso, origem } from './trilha.mjs';

const URL_DA_TRILHA = 'https://app.primoia.ai/api/v1/trilha/landing';
const CHAVE = 'chave-de-teste-nao-e-segredo';
const CHROME = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36';
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1';
const VISTA = '0b6f3c1e-2a4d-4f8e-9c3b-7d5a1e2f4b6c';
const ASSETS = { fetch: async () => new Response('arquivo', { status: 200 }) };

function envDeTeste(extra = {}) {
  return { ASSETS, TRILHA_URL: URL_DA_TRILHA, TRILHA_CHAVE: CHAVE, ...extra };
}

function ctxDeTeste() {
  const pendentes = [];
  return { pendentes, waitUntil: (p) => pendentes.push(p) };
}

function grampoNoFetch() {
  const chamadas = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    chamadas.push({ url, init, corpo: JSON.parse(init.body) });
    return new Response(null, { status: 202 });
  };
  return { chamadas, solta: () => (globalThis.fetch = original) };
}

function aviso(corpo = {}, cabecalhos = {}, cf = { country: 'BR', regionCode: 'SP', city: 'Campinas', asn: 28573 }) {
  const texto = typeof corpo === 'string' ? corpo : JSON.stringify({ vista: VISTA, rota: '/', de: '', teste: false, ...corpo });
  const r = new Request('https://politicasemgrito.com.br/_trilha', {
    method: 'POST',
    body: texto,
    headers: {
      'content-type': 'text/plain',
      'content-length': String(new TextEncoder().encode(texto).length),
      'user-agent': CHROME,
      'accept-language': 'pt-BR,pt;q=0.9',
      'sec-fetch-site': 'same-origin',
      ...cabecalhos,
    },
  });
  Object.defineProperty(r, 'cf', { value: cf });
  return r;
}

/** Manda o aviso e devolve o que chegou ao receptor (lista vazia se nada foi repassado). */
async function enviar(request, env = envDeTeste()) {
  const g = grampoNoFetch();
  try {
    const ctx = ctxDeTeste();
    const r = await worker.fetch(request, env, ctx);
    await Promise.all(ctx.pendentes);
    assert.equal(r.status, 204);
    return g.chamadas;
  } finally {
    g.solta();
  }
}

test('aviso de gente: repassa a visita e o humano, só com os campos combinados', async () => {
  const chamadas = await enviar(aviso({ de: 'l.instagram.com' }, { 'user-agent': IPHONE }));
  assert.equal(chamadas.length, 1);
  const { url, init, corpo } = chamadas[0];
  assert.equal(url, URL_DA_TRILHA);
  assert.equal(init.method, 'POST');
  assert.equal(init.headers['X-Trilha-Landing'], CHAVE);
  assert.equal(init.headers['content-type'], 'application/json');
  assert.deepEqual(Object.keys(corpo).sort(), ['dispositivo', 'eventos', 'session_id', 'versao_front']);
  assert.equal(corpo.session_id, VISTA);
  assert.equal(corpo.dispositivo, 'celular');
  assert.equal(corpo.versao_front, 'politica-sem-gritos');
  const [vista, humano] = corpo.eventos;
  assert.equal(corpo.eventos.length, 2);
  assert.deepEqual(Object.keys(vista).sort(), ['bot', 'evento', 'origem', 'pais', 'rota', 'ts', 'vista']);
  assert.deepEqual({ ...vista, ts: 'x' }, { evento: 'landing_vista', ts: 'x', vista: VISTA, rota: '/', origem: 'social', bot: 'nao', pais: 'BR' });
  assert.deepEqual({ ...humano, ts: 'x' }, { evento: 'landing_humano', ts: 'x', vista: VISTA });
  assert.ok(!JSON.stringify(corpo).includes('instagram'), 'o site de origem não sai do Worker');
  assert.ok(!JSON.stringify(corpo).includes('Campinas'), 'a cidade não sai do Worker');
});

test('aviso de teste: os dois eventos levam utm_source teste', async () => {
  const [{ corpo }] = await enviar(aviso({ teste: true }));
  for (const e of corpo.eventos) assert.equal(e.utm_source, 'teste');
});

test('sem Sec-Fetch-Site (navegador antigo) ainda conta', async () => {
  const r = aviso();
  r.headers.delete('sec-fetch-site');
  assert.equal((await enviar(r)).length, 1);
});

test('país fora do formato não vai', async () => {
  const [{ corpo }] = await enviar(aviso({}, {}, { country: 'T1' }));
  assert.equal('pais' in corpo.eventos[0], false);
  const [{ corpo: semCf }] = await enviar(aviso({}, {}, null));
  assert.equal('pais' in semCf.eventos[0], false);
});

test('rota vai em minúsculas e sem ? nem #', async () => {
  const [{ corpo }] = await enviar(aviso({ rota: '/Tema?x=1#y' }));
  assert.equal(corpo.eventos[0].rota, '/tema');
});

const DESCARTADOS = {
  'corpo grande': () => aviso({ de: 'a'.repeat(70) + '.com', rota: '/' + 'a'.repeat(100), extra: 'x'.repeat(1000) }),
  'content-length acima de 1024': () => aviso({}, { 'content-length': '2048' }),
  'sem content-length': () => {
    const r = aviso();
    r.headers.delete('content-length');
    return r;
  },
  'UUID ruim': () => aviso({ vista: 'nao-e-uuid' }),
  'rota com caractere de fora': () => aviso({ rota: '/<script>' }),
  'rota sem barra': () => aviso({ rota: 'tema' }),
  'de que não é nome de host': () => aviso({ de: 'https://exemplo.com/caminho' }),
  'de grande demais': () => aviso({ de: 'a'.repeat(81) }),
  'teste que não é booleano': () => aviso({ teste: 'sim' }),
  'JSON quebrado': () => aviso('{vista:'),
  'outro site': () => aviso({}, { 'sec-fetch-site': 'cross-site' }),
  'mesmo site, outra origem': () => aviso({}, { 'sec-fetch-site': 'same-site' }),
  robô: () => aviso({}, { 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' }),
  'navegador sem idioma': () => aviso({}, { 'accept-language': '' }),
  'sem user-agent': () => aviso({}, { 'user-agent': '' }),
  'sonda pelo user-agent': () => aviso({}, { 'user-agent': 'primoia-sonda/1' }),
  'sonda pelo cabeçalho': () => aviso({}, { 'x-primoia-sonda': '1' }),
};

for (const [caso, montar] of Object.entries(DESCARTADOS)) {
  test(`descartado, responde 204 e não repassa nada: ${caso}`, async () => {
    assert.equal((await enviar(montar())).length, 0);
  });
}

test('GET em /_trilha: 204 e nada repassado', async () => {
  const r = new Request('https://politicasemgrito.com.br/_trilha', { headers: { 'user-agent': CHROME, 'accept-language': 'pt-BR' } });
  assert.equal((await enviar(r)).length, 0);
});

test('sem a chave ou sem a URL, nada é repassado', async () => {
  assert.equal((await enviar(aviso(), envDeTeste({ TRILHA_CHAVE: undefined }))).length, 0);
  assert.equal((await enviar(aviso(), envDeTeste({ TRILHA_URL: undefined }))).length, 0);
});

test('receptor fora do ar não derruba a resposta', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error('fora do ar');
  };
  try {
    const ctx = ctxDeTeste();
    const r = await worker.fetch(aviso(), envDeTeste(), ctx);
    await Promise.all(ctx.pendentes);
    assert.equal(r.status, 204);
  } finally {
    globalThis.fetch = original;
  }
});

test('outros caminhos saem dos arquivos, sem contar', async () => {
  const g = grampoNoFetch();
  try {
    const ctx = ctxDeTeste();
    for (const caminho of ['/', '/index.html', '/nao-existe', '/_trilha/x']) {
      const r = await worker.fetch(new Request(`https://politicasemgrito.com.br${caminho}`), envDeTeste(), ctx);
      assert.equal(await r.text(), 'arquivo');
    }
    assert.equal(ctx.pendentes.length, 0);
    assert.equal(g.chamadas.length, 0);
  } finally {
    g.solta();
  }
});

test('origem: só a categoria', () => {
  assert.equal(origem(''), 'direto');
  assert.equal(origem('www.google.com.br'), 'busca');
  assert.equal(origem('duckduckgo.com'), 'busca');
  assert.equal(origem('l.facebook.com'), 'social');
  assert.equal(origem('wa.me'), 'social');
  assert.equal(origem('t.co'), 'social');
  assert.equal(origem('politicasemgrito.com.br'), 'interno');
  assert.equal(origem('www.politicasemgrito.com.br'), 'interno');
  assert.equal(origem('g1.globo.com'), 'outro');
  assert.equal(origem('192.168.0.10'), 'outro');
  assert.equal(origem('intranet.local'), 'outro');
});

test('aparelho', () => {
  assert.equal(aparelho(CHROME), 'computador');
  assert.equal(aparelho(IPHONE), 'celular');
  assert.equal(aparelho('Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)'), 'tablet');
  assert.equal(aparelho('Mozilla/5.0 (Linux; Android 14; SM-X200) Safari/537.36'), 'tablet');
  assert.equal(aparelho('Mozilla/5.0 (Linux; Android 14; Pixel 8) Mobile Safari/537.36'), 'celular');
});

test('lerAviso não aceita campo de tipo errado', () => {
  assert.equal(lerAviso(JSON.stringify({ vista: VISTA, rota: '/', teste: false })), null);
  assert.equal(lerAviso(JSON.stringify([VISTA])), null);
  assert.equal(lerAviso('null'), null);
  assert.deepEqual(lerAviso(JSON.stringify({ vista: VISTA.toUpperCase(), rota: '/', de: 'WA.ME', teste: true })), {
    vista: VISTA,
    rota: '/',
    de: 'wa.me',
    teste: true,
  });
});
