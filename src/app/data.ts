import { Candidate, Chamber, Indicator, Scenario } from './models';
import { S, UPDATED_AT, src } from './fontes';

export { UPDATED_AT } from './fontes';
export { TOPICS, TOPIC_GROUPS } from './temas';

export const FIRST_ROUND = {
  date: '4 de outubro de 2026',
  runoff: '25 de outubro de 2026',
  runoffDate: '2026-10-25',
  results: [
    { id: 'flavio', name: 'Flávio Bolsonaro (PL)', pct: 47.03, votes: '56.104.503' },
    { id: 'lula', name: 'Lula (PT)', pct: 45.16, votes: '53.879.538' },
  ],
  note: 'Números oficiais da totalização do TSE (05/10/2026).',
  sources: [S.tsePresidente],
  rule: 'Disputam os dois mais votados no 1º turno. Vence quem tiver a maioria dos votos válidos — brancos e nulos não entram na conta.',
  ruleSources: [
    src(
      'Constituição Federal — art. 77 (eleição do Presidente da República)',
      'Planalto',
      'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
    ),
  ],
};

/** Ordem alfabética. A interface permite inverter as colunas. */
export const CANDIDATES: Candidate[] = [
  {
    id: 'flavio',
    name: 'Flávio Bolsonaro',
    party: 'PL',
    vice: 'Alfredo Gaspar',
    photo: {
      src: 'candidatos/flavio.jpg',
      credit: 'Foto oficial: Agência Senado (uso com atribuição)',
      url: 'https://commons.wikimedia.org/wiki/File:Foto_oficial_do_senador_Fl%C3%A1vio_Bolsonaro_(v._AgSen)_(3x4).jpg',
    },
    planTitle: '“Para o Brasil vencer o atraso”',
    planSummary:
      'Plano de 76 páginas registrado no TSE, organizado em nove eixos, de “Brasil sem Medo” a “Brasil que Não Volta Atrás”. O de custo de vida se chama “Brasil Mais Barato”.',
    background:
      'Senador pelo Rio de Janeiro desde 2019. Nunca ocupou cargo no Executivo: não há histórico próprio de governo para comparar. O governo de seu pai, Jair Bolsonaro (2019–2022), é referência do grupo político, não um resultado dele.',
    profile: [
      { label: 'Nascimento', value: '30/04/1981 (45 anos no dia do 2º turno)' },
      {
        label: 'Cargos eletivos',
        value:
          'Deputado estadual no Rio de Janeiro (2003–2019) e senador pelo Rio de Janeiro desde 2019',
      },
      {
        label: 'Experiência no Executivo',
        value: 'Nenhuma: nunca foi prefeito, governador ou presidente',
      },
    ],
    sources: [S.planoFlavio, S.tsePresidente, S.wikiFlavio],
  },
  {
    id: 'lula',
    name: 'Lula',
    party: 'PT',
    vice: 'Geraldo Alckmin (PSB)',
    photo: {
      src: 'candidatos/lula.jpg',
      credit: 'Foto oficial: Ricardo Stuckert/PR (CC BY 2.0)',
      url: 'https://commons.wikimedia.org/wiki/File:Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_(ombros)_denoise.jpg',
    },
    planTitle: '“Diretrizes para o Programa de Transformação do Brasil”',
    planSummary: 'Plano de 84 páginas registrado no TSE, organizado em 13 diretrizes.',
    background:
      'Presidente em três mandatos (2003–2006, 2007–2010 e 2023–2026). Há histórico próprio de governo, que pode ser comparado com os indicadores oficiais em “O que os dados mostram”, mais abaixo.',
    profile: [
      { label: 'Nascimento', value: '06/10/1945 (81 anos no dia do 2º turno)' },
      {
        label: 'Cargos eletivos',
        value:
          'Deputado federal constituinte por São Paulo (1987–1991) e presidente da República (2003–2010 e desde 2023)',
      },
      {
        label: 'Experiência no Executivo',
        value: '12 anos como presidente ao fim do mandato atual',
      },
    ],
    sources: [S.planoLula, S.tsePresidente, S.wikiLula],
  },
];

export const CHAMBERS: Chamber[] = [
  {
    id: 'camara',
    name: 'Câmara dos Deputados',
    total: 513,
    thresholds: [
      { label: 'Maioria absoluta', seats: 257, note: 'leis complementares e derrubada de veto' },
      { label: '3/5', seats: 308, note: 'emenda à Constituição (PEC)' },
    ],
    parties: [
      { party: 'PL', seats: 118, bloc: 'flavio' },
      { party: 'União–PP', seats: 85, bloc: 'flavio' },
      { party: 'Republicanos', seats: 41, bloc: 'flavio' },
      { party: 'Podemos', seats: 25, bloc: 'flavio' },
      { party: 'Novo', seats: 10, bloc: 'flavio' },
      { party: 'PSD', seats: 42, bloc: 'independente' },
      { party: 'MDB', seats: 36, bloc: 'independente' },
      { party: 'PSDB–Cidadania', seats: 11, bloc: 'independente' },
      { party: 'PRD–Solidariedade', seats: 7, bloc: 'independente' },
      { party: 'Avante', seats: 5, bloc: 'independente' },
      { party: 'Missão', seats: 1, bloc: 'independente' },
      { party: 'PT–PCdoB–PV', seats: 88, bloc: 'lula' },
      { party: 'PSB', seats: 15, bloc: 'lula' },
      { party: 'PSOL–Rede', seats: 15, bloc: 'lula' },
      { party: 'PDT', seats: 6, bloc: 'lula' },
    ],
    pending: 8,
    caveat:
      'Números oficiais do TSE. 8 vagas ainda não têm eleito definido porque dependem de candidaturas sub judice (sob julgamento); podem mudar até a diplomação.',
    sources: [S.tseResultados],
  },
  {
    id: 'senado',
    name: 'Senado Federal',
    total: 81,
    thresholds: [
      { label: 'Maioria absoluta', seats: 41, note: 'aprovar indicados ao STF e derrubar veto' },
      { label: '3/5', seats: 49, note: 'emenda à Constituição (PEC)' },
      { label: '2/3', seats: 54, note: 'condenar em processo de impeachment' },
    ],
    parties: [
      { party: 'PL', seats: 28, bloc: 'flavio' },
      { party: 'Republicanos', seats: 6, bloc: 'flavio' },
      { party: 'PP', seats: 6, bloc: 'flavio' },
      { party: 'União', seats: 5, bloc: 'flavio' },
      { party: 'Novo', seats: 3, bloc: 'flavio' },
      { party: 'Podemos', seats: 2, bloc: 'flavio' },
      { party: 'MDB', seats: 8, bloc: 'independente' },
      { party: 'PSD', seats: 5, bloc: 'independente' },
      { party: 'PSDB', seats: 2, bloc: 'independente' },
      { party: 'Sem partido', seats: 1, bloc: 'independente' },
      { party: 'PT', seats: 9, bloc: 'lula' },
      { party: 'PSB', seats: 4, bloc: 'lula' },
      { party: 'Rede', seats: 1, bloc: 'lula' },
      { party: 'PDT', seats: 1, bloc: 'lula' },
    ],
    caveat:
      'Soma dos 54 eleitos em 2026 (conferidos no TSE: PL 19, MDB 7, PT 6, PP, PSB, União e Novo 3 cada, Republicanos, PSDB, PSD e Podemos 2 cada, Rede e PDT 1 cada) com os 27 que seguem no mandato, segundo a imprensa. Suplentes e trocas de partido podem alterar os totais.',
    sources: [S.tseResultados, S.cnnSenado, S.agBrasilSenado],
  },
];

export const BLOC_NOTE = {
  text: 'Os blocos seguem a coligação de Lula registrada no TSE, “Brasil Pronto pra Mais” (PT, PCdoB, PV, PSB, PDT, PSOL e Rede), e os partidos que declararam apoio a Flávio no 2º turno (PL, União, PP, Republicanos, Podemos e Novo), segundo a imprensa. Apoio eleitoral não é voto garantido: partidos de centro costumam negociar com quem vencer, projeto a projeto.',
  sources: [S.tsePresidente, S.wiki, S.constituicao],
};

export const SCENARIOS: Scenario[] = [
  {
    id: 'flavio',
    title: 'Se Flávio Bolsonaro vencer',
    reading:
      'Governo e Congresso do mesmo lado. O bloco que o apoia soma, no papel, 279 deputados e 50 senadores: passa da maioria absoluta nas duas Casas e alcança os 3/5 no Senado, mas fica 29 votos abaixo dos 308 necessários para emendar a Constituição na Câmara (há ainda 8 vagas indefinidas).',
    positives: [
      'Menos paralisia: projetos de lei comuns, orçamento e indicações tendem a andar mais rápido.',
      'Maior chance de a agenda prometida (impostos, segurança, privatizações) ser de fato votada, o que permite cobrar resultados.',
      'Menor risco de crises entre Executivo e Legislativo.',
    ],
    negatives: [
      'Menos freios: um Congresso alinhado fiscaliza menos, abre menos CPIs e aprova indicações com menos escrutínio.',
      'Mudanças no STF e em regras constitucionais ficam ao alcance com poucos votos de centro.',
      'Um bloco grande não é barato: o apoio costuma ser pago com emendas e cargos, o que dificulta a promessa de cortar gastos.',
    ],
  },
  {
    id: 'lula',
    title: 'Se Lula vencer',
    reading:
      'Governo dividido. A coligação de Lula soma 124 deputados e 15 senadores: precisaria de mais 133 deputados e 26 senadores só para a maioria absoluta. Um veto presidencial pode ser derrubado pelo bloco adversário.',
    positives: [
      'Mais freios: nada passa sem negociação, o que barra medidas extremas e obriga a moderar propostas.',
      'Congresso de oposição fiscaliza mais (CPIs, convocações, sabatinas mais duras).',
      'Mudanças constitucionais só saem com acordo amplo.',
    ],
    negatives: [
      'Risco alto de paralisia: propostas como o fim da escala 6x1 dificilmente avançam.',
      'O Congresso pode impor a própria pauta e derrubar vetos; o presidente governa reagindo.',
      'Cada votação vira negociação por emendas e cargos, o que encarece a governabilidade, e o risco de crise institucional (inclusive pedidos de impeachment) aumenta.',
    ],
  },
];

const gov = (y: number): string =>
  y <= 2010
    ? 'Lula'
    : y <= 2015
      ? 'Dilma'
      : y === 2016
        ? 'Dilma/Temer'
        : y <= 2018
          ? 'Temer'
          : y <= 2022
            ? 'Bolsonaro'
            : 'Lula';

const series = (start: number, values: number[]) =>
  values.map((value, i) => ({ year: start + i, value, government: gov(start + i) }));

export const INDICATORS: Indicator[] = [
  {
    id: 'ipca',
    title: 'Inflação (IPCA)',
    unit: '% no ano',
    description:
      'Quanto os preços subiram, em média, ao longo de cada ano. É a medida oficial de inflação do país.',
    latest: { label: '12 meses até set/2026', value: '4,58%' },
    series: series(
      2003,
      [
        9.3, 7.6, 5.69, 3.14, 4.46, 5.9, 4.31, 5.91, 6.5, 5.84, 5.91, 6.41, 10.67, 6.29, 2.95, 3.75,
        4.31, 4.52, 10.06, 5.79, 4.62, 4.83, 4.26,
      ],
    ),
    cannotConclude: [
      'Uma inflação alta num mandato não prova que o presidente causou toda a alta: 2021 teve o choque global da pandemia; 2015, o reajuste represado de tarifas.',
      'Também não isenta o governo: política de gastos, câmbio e preços administrados influenciam o resultado.',
      'A média esconde diferenças: alimentos e aluguel podem subir bem mais que o índice geral, e é isso que as famílias de menor renda sentem.',
      'Inflação caindo não significa preços caindo — significa preços subindo mais devagar.',
    ],
    sources: [S.sidraIpca],
  },
  {
    id: 'selic',
    title: 'Juros básicos (Selic)',
    unit: '% ao ano, meta do Copom em 31 de dezembro',
    description:
      'A taxa que o Banco Central usa para frear ou estimular a economia. Serve de base para os juros de empréstimos, financiamentos e aplicações.',
    latest: { label: 'decisão do Copom de 16/09/2026', value: '13,75%' },
    series: series(
      2003,
      [
        16.5, 17.75, 18, 13.25, 11.25, 13.75, 8.75, 10.75, 11, 7.25, 10, 11.75, 14.25, 13.75, 7,
        6.5, 4.5, 2, 9.25, 13.75, 11.75, 12.25, 15,
      ],
    ),
    cannotConclude: [
      'A Selic não é decidida pelo presidente, e sim pelo Copom, do Banco Central. Desde 2021 a diretoria do BC tem mandato fixo e não coincide com o do presidente da República.',
      'Juros sobem para conter a inflação: um ano de Selic alta costuma vir logo depois de inflação alta (compare 2021 e 2022 com o gráfico acima).',
      'As contas do governo também pesam: quando cresce a desconfiança sobre a dívida pública, os juros tendem a ficar mais altos. O gráfico sozinho não mostra quanto disso explica cada ano.',
      'É a taxa básica. O que as famílias pagam no cartão, no cheque especial e no crediário é bem mais alto e não aparece aqui.',
    ],
    sources: [S.sgsSelic, S.bcbSelic, S.lc179],
  },
  {
    id: 'desocupacao',
    title: 'Desemprego',
    unit: '% no trimestre encerrado em dezembro',
    description:
      'Parcela das pessoas que procuram trabalho e não encontram. A série atual do IBGE começa em 2012.',
    latest: { label: 'trimestre até ago/2026', value: '5,3%' },
    series: series(
      2012,
      [6.9, 6.2, 6.6, 9.1, 12.1, 11.9, 11.7, 11.1, 14.2, 11.1, 7.9, 7.4, 6.2, 5.1],
    ),
    cannotConclude: [
      'O pico de 2020 reflete a pandemia; a alta de 2015–2016, a recessão daqueles anos. A queda começou em 2021 e continuou depois, atravessando dois governos.',
      'Desemprego baixo não diz nada sobre a qualidade do emprego: informalidade e renda precisam ser vistas junto.',
      'Emprego alto com juros altos (Selic a 13,75%) pode conviver com famílias endividadas e sensação de aperto.',
    ],
    sources: [S.sidraPnad, S.acessaPnad],
  },
  {
    id: 'rendimento',
    title: 'Renda do trabalho e salário mínimo',
    unit: 'R$ por mês, em dezembro de cada ano',
    description:
      'Duas linhas: o salário mínimo e o rendimento médio de quem trabalha (somando todos os trabalhos). Em “valores de hoje” a inflação já foi descontada, então dá para comparar os anos direto; em “valores da época” aparece o número que valia naquele ano.',
    highlight: 'a inflação já foi descontada',
    latest: {
      label: 'hoje',
      value:
        'salário mínimo de R$ 1.621 e rendimento médio de R$ 3.777 (trimestre até ago/2026), cerca de 2,3 salários mínimos',
    },
    format: 'reais',
    series: series(
      2012,
      [3189, 3289, 3348, 3239, 3260, 3306, 3351, 3361, 3442, 3068, 3317, 3418, 3563, 3742],
    ),
    lines: [
      {
        key: 'media',
        label: 'Rendimento médio do trabalho',
        start: 2012,
        real: [3189, 3289, 3348, 3239, 3260, 3306, 3351, 3361, 3442, 3068, 3317, 3418, 3563, 3742],
        nominal: [
          1493, 1630, 1767, 1887, 2032, 2120, 2236, 2319, 2476, 2439, 2795, 3014, 3293, 3613,
        ],
      },
      {
        key: 'minimo',
        label: 'Salário mínimo',
        start: 2003,
        real: [
          822, 827, 903, 1022, 1062, 1095, 1176, 1218, 1222, 1318, 1356, 1361, 1339, 1407, 1455,
          1428, 1432, 1435, 1372, 1429, 1488, 1518, 1565,
        ],
        nominal: [
          240, 260, 300, 350, 380, 415, 465, 510, 545, 622, 678, 724, 788, 880, 937, 954, 998, 1045,
          1100, 1212, 1320, 1412, 1518,
        ],
      },
    ],
    cannotConclude: [
      'Em valores da época, o salário mínimo sempre sobe (de R$ 240 em 2003 para R$ 1.518 em 2025). Descontada a inflação, ele quase dobrou até 2012 e depois cresceu bem mais devagar, com recuo em 2021.',
      'A alta da renda média em 2020 é efeito da pandemia, não ganho de verdade: quem ganhava menos perdeu o emprego e saiu da conta. Em 2021 ela caiu de volta.',
      'É uma média: pode subir porque os salários mais altos subiram, sem que a maioria tenha ganhado mais. Não mostra a renda de quem está desempregado nem de aposentadorias e benefícios.',
      'O salário mínimo foi trazido a valores de hoje pelo IPCA; o IBGE usa um deflator próprio para a renda média. A diferença entre os dois métodos é pequena.',
    ],
    sources: [S.sidraRenda, S.ipeaSalMin, S.sidraIpcaIndice],
  },
];

export const SNAPSHOT = {
  items: [
    {
      label: 'Inflação em 12 meses',
      value: '4,58%',
      detail: 'IPCA até set/2026 · acima do teto da meta (4,5%)',
      sources: [S.sidraIpca],
    },
    {
      label: 'Juros básicos (Selic)',
      value: '13,75%',
      detail: 'ao ano · decisão do Copom de 16/09/2026',
      sources: [S.selic, S.bcbSelic],
    },
    {
      label: 'Desemprego',
      value: '5,3%',
      detail: 'trimestre até ago/2026',
      sources: [S.sidraPnad, S.acessaPnad],
    },
    {
      label: 'Rendimento médio real',
      value: 'R$ 3.777',
      detail: 'por mês · trimestre até ago/2026',
      sources: [S.sidraRenda, S.acessaPnad],
    },
  ],
  reading:
    'Os números ajudam a entender a sensação de aperto: o emprego está alto, mas os juros de 13,75% ao ano encarecem cartão, financiamento e aluguel, e a inflação acumulada dos últimos anos não foi devolvida — os preços não voltaram, só passaram a subir mais devagar.',
};

export const EDITORIAL_RULES = [
  'Nenhuma nota para candidatos. O site não declara vencedor.',
  'Mesma estrutura, mesmas perguntas e mesmo tratamento visual para os dois.',
  'Proposta, fato e análise aparecem com etiquetas diferentes. Proposta não é realização.',
  'Toda informação tem link para a fonte e data de acesso.',
  '“O que o plano não diz” aponta temas importantes que o plano registrado no TSE não trata, ou trata sem detalhes.',
  'Benefícios e riscos são análises do site, não fatos. Discorde à vontade, e confira as fontes.',
];

/**
 * Autoria e repositório, mostrados no rodapé. `repoUrl` vazio esconde os links do
 * GitHub; preencha quando o repositório público existir.
 */
export const SITE = {
  author: 'Simone Auler',
  repoUrl: 'https://github.com/SyAuler/politica-sem-gritos',
  license: 'MIT',
};

/** Limites desta versão do site: o que ele não cobre ou cobre com ressalva. */
export const LIMITATIONS = [
  'As propostas foram resumidas dos planos de governo registrados no TSE, com a página de cada item. Resumir sempre simplifica: na dúvida, leia o trecho no PDF oficial.',
  'Só entra o que está no plano registrado. Promessas feitas em debates, entrevistas e redes sociais não aparecem aqui.',
  'Histórico judicial e controvérsias de cada candidato ainda não entraram: exigem fontes primárias (decisões judiciais) conferidas uma a uma.',
  'A trajetória dos candidatos vem de biografias públicas (Wikipédia) e ainda não foi conferida, item por item, em fonte oficial.',
  'Os 27 senadores que continuam no mandato vêm de levantamentos da imprensa; os eleitos em 2026 foram conferidos no TSE.',
];

/** Fatos que podem mudar o conteúdo depois desta revisão (o site não promete atualizar). */
export const UPDATES: { when: string; text: string }[] = [
  {
    when: '25 de outubro',
    text: 'Resultado do 2º turno. A partir daí só um dos cenários do Congresso continua valendo.',
  },
  {
    when: 'Até dezembro',
    text: 'Diplomação dos eleitos: as 8 vagas indefinidas da Câmara podem ser definidas, e a Justiça Eleitoral pode mudar algum resultado.',
  },
  {
    when: '1º de janeiro de 2027',
    text: 'Posse. Partidos podem trocar de lado no Congresso, e a base do governo deixa de ser só a do papel.',
  },
  {
    when: 'A cada divulgação',
    text: 'IBGE e Banco Central publicam novos dados de inflação, juros, desemprego e renda.',
  },
];

/**
 * Perguntas sugeridas para levar a uma IA. `{tema}` vira o nome do tema escolhido.
 * Todas pedem fontes, separação entre fato e opinião e nenhuma recomendação de voto.
 */
export const AI_QUESTIONS: { id: string; label: string; text: string }[] = [
  {
    id: 'tema',
    label: 'Comparar as propostas do tema',
    text: 'Compare as propostas de Lula e de Flávio Bolsonaro sobre {tema}, com base nos planos de governo registrados no TSE para a eleição presidencial de 2026. Para cada proposta, explique em linguagem simples o que pode mudar na vida das pessoas, com prós e contras. Separe o que é fato do que é opinião, cite as fontes e não recomende voto. Se você não tiver acesso a esses documentos, diga isso em vez de supor.',
  },
  {
    id: 'estudos',
    label: 'O que dizem especialistas',
    text: 'O que estudos e especialistas dizem sobre {tema} no Brasil? Mostre argumentos a favor e contra as principais propostas em debate na eleição presidencial de 2026, com fontes, de forma imparcial e sem recomendar voto.',
  },
  {
    id: 'diferencas',
    label: 'Diferenças entre os planos',
    text: 'Quais são as principais diferenças entre os planos de governo de Lula e de Flávio Bolsonaro registrados no TSE para a eleição presidencial de 2026? Organize por tema, separe o que é fato do que é opinião, cite as fontes e não recomende voto. Se você não tiver acesso a esses documentos, diga isso em vez de supor.',
  },
  {
    id: 'congresso',
    label: 'Presidente e Congresso',
    text: 'O que um presidente do Brasil consegue fazer sozinho e o que depende do Congresso? Explique com exemplos simples, como medidas provisórias, vetos, leis e emendas à Constituição.',
  },
  {
    id: 'checar',
    label: 'Checar um vídeo ou notícia',
    text: 'Como posso verificar se um vídeo, áudio ou notícia sobre um candidato é verdadeiro antes de compartilhar? Me dê um passo a passo simples e ferramentas gratuitas de checagem usadas no Brasil.',
  },
];

/**
 * IAs com versão gratuita, em ordem alfabética e com o mesmo tratamento. `prefill`:
 * o link já abre com a pergunta digitada; nas outras, a pergunta vai copiada.
 */
export const AI_LINKS: { name: string; url: string; prefill: boolean }[] = [
  { name: 'ChatGPT', url: 'https://chatgpt.com/?q=', prefill: true },
  { name: 'Claude', url: 'https://claude.ai/new?q=', prefill: true },
  { name: 'Copilot', url: 'https://copilot.microsoft.com/', prefill: false },
  { name: 'Gemini', url: 'https://gemini.google.com/app', prefill: false },
  { name: 'Perplexity', url: 'https://www.perplexity.ai/search?q=', prefill: true },
];
