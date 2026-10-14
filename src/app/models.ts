export type CandidateId = 'flavio' | 'lula';

/** Tipo de evidência: toda informação exibida carrega uma destas etiquetas. */
export type EvidenceKind = 'proposta' | 'fato' | 'analise';

export interface SourceReference {
  title: string;
  url: string;
  publisher: string;
  accessedAt: string;
}

export interface Candidate {
  id: CandidateId;
  name: string;
  party: string;
  vice: string;
  /** Retratos oficiais, com o mesmo enquadramento para os dois. */
  photo: { src: string; credit: string; url: string };
  planTitle: string;
  planSummary: string;
  background: string;
  /** Trajetória em itens curtos, com o mesmo número de linhas para os dois. */
  profile: { label: string; value: string }[];
  sources: SourceReference[];
}

export interface Proposal {
  summary: string;
  /** 'oficial' = conferido no plano registrado no TSE; 'nao-localizado' = tema que o plano não trata. */
  status: 'oficial' | 'nao-localizado';
  /** Página(s) do PDF do plano registrado no TSE onde o item foi conferido. */
  pages?: string;
  sources: SourceReference[];
}

export interface ImpactSide {
  mechanism: string;
  benefits: string[];
  risks: string[];
}

export interface Topic {
  id: string;
  icon: string;
  title: string;
  question: string;
  proposals: Record<CandidateId, Proposal[]>;
  impact: Record<CandidateId, ImpactSide> & { monitor: string[]; reviewedAt: string };
}

export interface PartySeats {
  party: string;
  seats: number;
  /** Posição declarada no 2º turno — não é garantia de voto no plenário. */
  bloc: CandidateId | 'independente';
}

export interface Chamber {
  id: 'camara' | 'senado';
  name: string;
  total: number;
  thresholds: { label: string; seats: number; note: string }[];
  parties: PartySeats[];
  /** Cadeiras ainda sem eleito definido (candidaturas sub judice). */
  pending?: number;
  caveat: string;
  sources: SourceReference[];
}

export interface Scenario {
  id: CandidateId;
  title: string;
  reading: string;
  positives: string[];
  negatives: string[];
}

export interface YearValue {
  year: number;
  value: number;
  government: string;
}

export interface Indicator {
  id: string;
  title: string;
  unit: string;
  description: string;
  /** Trecho da descrição a destacar (precisa aparecer igual no texto). */
  highlight?: string;
  latest: { label: string; value: string };
  /** Como mostrar os valores: em % (padrão) ou em reais. */
  format?: 'pct' | 'reais';
  /** Gráfico de linhas em vez de barras: várias séries, em valores de hoje e da época. */
  lines?: IncomeLine[];
  series: YearValue[];
  cannotConclude: string[];
  sources: SourceReference[];
}

export interface IncomeLine {
  key: string;
  label: string;
  /** Primeiro ano da série. */
  start: number;
  /** Em reais de hoje (descontada a inflação). */
  real: number[];
  /** Em reais da época. */
  nominal: number[];
}
