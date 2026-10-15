// Fontes citadas no site. Cada uma guarda título, quem publicou, link e data de acesso.
import { SourceReference } from './models';

/** Data da última revisão do conteúdo; também vira a data de acesso de cada fonte. */
export const UPDATED_AT = '2026-10-14';

export const src = (title: string, publisher: string, url: string): SourceReference => ({
  title,
  publisher,
  url,
  accessedAt: UPDATED_AT,
});

export const S = {
  tsePresidente: src(
    'Resultado oficial do 1º turno para Presidente (totalização de 05/10/2026)',
    'Tribunal Superior Eleitoral',
    'https://resultados.tse.jus.br/oficial/ele2026/6257/dados/br/br-c0001-e006257-u.json',
  ),
  tseResultados: src(
    'Resultados das Eleições 2026 — deputados federais e senadores eleitos, por estado',
    'Tribunal Superior Eleitoral',
    'https://resultados.tse.jus.br/',
  ),
  planoFlavio: src(
    'Diretrizes do Plano de Governo 2027–2030, “Para o Brasil vencer o atraso” (PDF registrado no TSE)',
    'TSE / DivulgaCandContas',
    'https://divulgacandcontas.tse.jus.br/divulga/#/candidato/BR/BR/20322002026/280002551544/2026/BR',
  ),
  planoLula: src(
    'Diretrizes para o Programa de Transformação do Brasil (PDF registrado no TSE)',
    'TSE / DivulgaCandContas',
    'https://divulgacandcontas.tse.jus.br/divulga/#/candidato/BR/BR/20322002026/280002542548/2026/BR',
  ),
  wikiLula: src(
    'Luiz Inácio Lula da Silva (biografia)',
    'Wikipédia',
    'https://pt.wikipedia.org/wiki/Luiz_In%C3%A1cio_Lula_da_Silva',
  ),
  wikiFlavio: src(
    'Flávio Bolsonaro (biografia)',
    'Wikipédia',
    'https://pt.wikipedia.org/wiki/Fl%C3%A1vio_Bolsonaro',
  ),
  wiki: src(
    '2026 Brazilian general election (resultado do 1º turno e coligações)',
    'Wikipedia',
    'https://en.wikipedia.org/wiki/2026_Brazilian_general_election',
  ),
  cnnSenado: src(
    'PL elege 19 senadores e terá a maior bancada do Senado; veja divisão',
    'CNN Brasil',
    'https://www.cnnbrasil.com.br/eleicoes/divisao-bancada-senado/',
  ),
  agBrasilSenado: src(
    'PL elege 19 senadores e soma 28; MDB conquista sete vagas e PT, seis',
    'Agência Brasil',
    'https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/pl-elege-19-senadores-e-soma-28-mdb-conquista-sete-vagas-e-pt-seis',
  ),
  constituicao: src(
    'Constituição Federal — arts. 47, 52, 60, 66 e 69 (quóruns de votação)',
    'Planalto',
    'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
  ),
  sidraIpca: src(
    'Tabela 1737 — IPCA, variação acumulada em 12 meses',
    'IBGE / SIDRA',
    'https://sidra.ibge.gov.br/tabela/1737',
  ),
  sidraRenda: src(
    'Tabela 6390 — Rendimento médio mensal real habitual de todos os trabalhos (PNAD Contínua)',
    'IBGE / SIDRA',
    'https://sidra.ibge.gov.br/tabela/6390',
  ),
  ipeaSalMin: src(
    'Salário mínimo vigente (série mensal MTE12_SALMIN12)',
    'Ipeadata / Ministério do Trabalho',
    'https://www.ipeadata.gov.br/ExibeSerie.aspx?serid=1739471028',
  ),
  sidraIpcaIndice: src(
    'Tabela 1737 — IPCA, número-índice (usado para trazer o salário mínimo a valores de hoje)',
    'IBGE / SIDRA',
    'https://sidra.ibge.gov.br/tabela/1737',
  ),
  sidraPnad: src(
    'Tabela 6381 — Taxa de desocupação, trimestres móveis (PNAD Contínua)',
    'IBGE / SIDRA',
    'https://sidra.ibge.gov.br/tabela/6381',
  ),
  acessaPnad: src(
    'Taxa de desemprego fica em 5,3% no trimestre até agosto, revela IBGE',
    'Acessa.com',
    'https://www.acessa.com/economia/2026/09/341214-taxa-de-desemprego-fica-em-53-no-trimestre-ate-agosto-revela-ibge.html',
  ),
  selic: src(
    'Nova taxa Selic chega em setembro ao patamar projetado para dezembro',
    'Economic News Brasil',
    'https://economicnewsbrasil.com.br/2026/09/16/nova-taxa-selic-projecao-dezembro-2026/',
  ),
  bcbSelic: src(
    'Taxas de juros básicas — histórico das decisões do Copom',
    'Banco Central do Brasil',
    'https://www.bcb.gov.br/controleinflacao/historicotaxasjuros',
  ),
  sgsSelic: src(
    'Série 432 — Meta Selic definida pelo Copom (% a.a.), consulta da última década',
    'Banco Central do Brasil / SGS',
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=01/01/2016&dataFinal=31/12/2025',
  ),
  sgsDivida: src(
    'Série 13762 — Dívida bruta do governo geral (% do PIB), metodologia a partir de 2008',
    'Banco Central do Brasil / SGS',
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.13762/dados?formato=json&dataInicial=01/12/2006&dataFinal=31/08/2026',
  ),
  bcbFiscais: src(
    'Estatísticas fiscais — nota mensal com a dívida do setor público',
    'Banco Central do Brasil',
    'https://www.bcb.gov.br/estatisticas/estatisticasfiscais',
  ),
  sgsDividaFatores: src(
    'Séries 5751, 5753, 5784 e 5786 — juros nominais e resultado primário (% do PIB, 12 meses), governo federal, estados e municípios',
    'Banco Central do Brasil / SGS',
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.5751/dados?formato=json&dataInicial=01/12/2006&dataFinal=31/12/2025',
  ),
  sgsPib: src(
    'Série 4382 — PIB acumulado dos últimos 12 meses, em R$ milhões',
    'Banco Central do Brasil / SGS',
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4382/dados?formato=json&dataInicial=01/12/2006&dataFinal=30/09/2026',
  ),
  sgsPibReal: src(
    'Série 7326 — PIB, variação real no ano (%)',
    'Banco Central do Brasil / SGS (dados do IBGE)',
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.7326/dados?formato=json',
  ),
  bcbFatores2013: src(
    'Boxe “Fatores condicionantes da evolução da dívida bruta do governo geral” (Relatório de Inflação, mar/2013)',
    'Banco Central do Brasil',
    'https://www.bcb.gov.br/htms/relinf/port/2013/06/ri201306b4p.pdf',
  ),
  lc179: src(
    'Lei Complementar 179/2021 — autonomia do Banco Central',
    'Planalto',
    'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp179.htm',
  ),
};
