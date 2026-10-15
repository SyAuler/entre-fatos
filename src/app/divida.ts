import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DEBT_CONTEXT, DEBT_FACTORS, DEBT_LATEST, gov } from './data';
import { DebtFactorYear, YearValue } from './models';

type FactorKey = 'juros' | 'primario' | 'pib' | 'outros';

/** Cores validadas para daltonismo (juros, déficit, PIB); "outros" fica em cinza neutro. */
const FACTORS: { key: FactorKey; label: string }[] = [
  { key: 'juros', label: 'Juros da dívida' },
  { key: 'primario', label: 'Déficit (+) ou superávit (−) do governo' },
  { key: 'pib', label: 'Crescimento do PIB em reais' },
  { key: 'outros', label: 'Outros (reservas, bancos públicos, ajustes)' },
];

/** "+4,3" / "−2,2", com o sinal de menos tipográfico. */
const signed = (v: number): string =>
  (v > 0 ? '+' : v < 0 ? '−' : '') +
  Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const pct = (v: number): string =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';

/** Anos seguidos do mesmo governo, em coordenadas x, para a faixa de legenda. */
function govBands(years: number[], x: (year: number) => number, pad: number) {
  const out: { x1: number; x2: number; parts: string[] }[] = [];
  let start = years[0];
  for (let i = 1; i <= years.length; i++) {
    if (i === years.length || gov(years[i]) !== gov(start)) {
      const label = gov(start);
      out.push({
        x1: x(start) - pad,
        x2: x(years[i - 1]) + pad,
        parts: label.split('/').map((p, j, all) => (j < all.length - 1 ? p + '/' : p)),
      });
      if (i < years.length) start = years[i];
    }
  }
  return out;
}

/**
 * Dívida pública num gráfico de dois andares com os mesmos anos: em cima, quanto a
 * dívida é (% do PIB); embaixo, o que fez ela mudar em cada ano (fatores). Tocar num
 * ano destaca os dois andares e troca o painel "O que aconteceu", que explica em texto.
 */
@Component({
  selector: 'app-divida',
  templateUrl: './divida.html',
  styleUrl: './divida.scss',
})
export class Divida {
  readonly series = input.required<YearValue[]>();

  constructor() {
    // em tela estreita o gráfico rola de lado: começa no fim, onde está o ano escolhido
    const host = inject(ElementRef<HTMLElement>);
    afterNextRender(() => {
      host.nativeElement.querySelectorAll('.scroll').forEach((el: Element) => {
        el.scrollLeft = el.scrollWidth;
      });
    });
  }

  protected readonly factors = FACTORS;
  protected readonly latest = DEBT_LATEST;
  protected readonly signed = signed;
  protected readonly pct = pct;

  /** Ano escolhido; 0 = dado mensal mais recente. Abre no último ano fechado. */
  protected readonly selected = signal<number>(DEBT_FACTORS[DEBT_FACTORS.length - 1].year);

  protected select(year: number): void {
    this.selected.set(year);
  }

  private value(year: number): number | undefined {
    return this.series().find((p) => p.year === year)?.value;
  }

  /** Variação da dívida entre o dezembro anterior e o do ano, em pontos do PIB. */
  private change(year: number): number {
    return (this.value(year) ?? 0) - (this.value(year - 1) ?? 0);
  }

  // ---------- gráfico de dois andares (quadro 1000 × 650) ----------
  protected readonly chart = computed(() => {
    const pts = this.series();
    const W = 1000;
    const H = 650;
    const left = 56;
    const right = 16;
    const first = pts[0].year;
    const lastYear = pts[pts.length - 1].year;
    // o dado mensal mais recente entra como uma coluna extra depois do último dezembro
    const slots = lastYear - first + 2;
    const slot = (W - left - right) / slots;
    const x = (year: number) => left + (year - first + 0.5) * slot;

    // andar de cima: quanto a dívida é
    const lineTop = 40;
    const lineBottom = 250;
    const yLine = (v: number) => lineTop + (1 - (v - 40) / 50) * (lineBottom - lineTop);
    const points = [
      ...pts.map((p) => ({ key: p.year, x: x(p.year), y: yLine(p.value), v: p.value })),
      { key: 0, x: x(lastYear + 1), y: yLine(this.latest.value), v: this.latest.value },
    ];
    const peak = pts.reduce((a, b) => (b.value > a.value ? b : a));
    const path = points
      .map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');

    // andar de baixo: o que fez a dívida mudar
    const barsTop = 310;
    const barsBottom = 540;
    const lim = 16;
    const yBar = (v: number) => barsTop + ((lim - v) / (2 * lim)) * (barsBottom - barsTop);
    const bw = slot * 0.58;
    const bars = DEBT_FACTORS.map((f) => {
      // positivos empilham para cima a partir do zero, negativos para baixo
      let up = 0;
      let down = 0;
      const segs = FACTORS.map(({ key }) => {
        const v = f[key];
        const from = v >= 0 ? up : down;
        const to = from + v;
        if (v >= 0) up = to;
        else down = to;
        return { key, y: Math.min(yBar(from), yBar(to)), h: Math.abs(yBar(from) - yBar(to)) };
      }).filter((s) => s.h > 0.5);
      return { year: f.year, bx: x(f.year) - bw / 2, segs, netY: yBar(this.change(f.year)) };
    });

    const years = [...pts.map((p) => p.year), lastYear + 1];
    const baseY = barsBottom + 8;
    return {
      W,
      H,
      left,
      right,
      slot,
      bw,
      lineTop,
      lineBottom,
      barsTop,
      barsBottom,
      baseY,
      zeroY: yBar(0),
      lineTicks: [40, 50, 60, 70, 80, 90].map((v) => ({ y: yLine(v), label: v + '%' })),
      barTicks: [-15, -10, -5, 0, 5, 10, 15].map((v) => ({
        y: yBar(v),
        zero: v === 0,
        label: v === 0 ? '0' : (v > 0 ? '+' : '−') + Math.abs(v),
      })),
      points,
      peakKey: peak.year,
      path,
      area: `${path} L${points[points.length - 1].x.toFixed(1)} ${lineBottom} L${points[0].x.toFixed(1)} ${lineBottom} Z`,
      bars,
      // os rótulos de direção ficam na coluna de 2006, que não tem barra
      upY: yBar(13.5),
      downY: yBar(-13.5),
      labelX: x(first) - slot / 2 + 6,
      columns: years.map((year) => {
        const key = year === lastYear + 1 ? 0 : year;
        const v = key === 0 ? this.latest.value : (this.value(year) as number);
        const net = key && key !== first ? this.change(year) : null;
        return {
          key,
          x: x(year),
          label: key === 0 ? this.latest.label : String(year % 100).padStart(2, '0'),
          aria:
            (key === 0 ? this.latest.long : year) +
            `: ${pct(v)} do PIB` +
            (net === null
              ? ''
              : `; a dívida ${net >= 0 ? 'subiu' : 'caiu'} ${signed(Math.abs(net)).replace('+', '')} pontos no ano`),
        };
      }),
      govs: govBands(years, x, slot * 0.42),
    };
  });

  // ---------- painel "O que aconteceu" ----------
  protected readonly explanation = computed(() => {
    const year = this.selected();
    if (year === 0) {
      const dec = this.series()[this.series().length - 1];
      const diff = this.latest.value - dec.value;
      return {
        title: `${this.latest.long}: ${pct(this.latest.value)} do PIB`,
        summary: `É o dado mensal mais recente. Desde dezembro de ${dec.year}, a dívida ${diff >= 0 ? 'subiu' : 'caiu'} ${signed(Math.abs(diff)).replace('+', '')} pontos.`,
        up: [] as { key: FactorKey; text: string; why: string; v: string }[],
        down: [] as { key: FactorKey; text: string; why: string; v: string }[],
        context:
          'Os fatores de cada ano só são calculados com o ano fechado. O que se sabe de 2026: a Selic está em 13,75% ao ano, e os juros da dívida seguem acompanhando essa taxa.',
      };
    }
    if (!DEBT_FACTORS.some((x) => x.year === year)) {
      return {
        title: `${year}: ${pct(this.value(year) ?? 0)} do PIB`,
        summary: 'É o primeiro ano da série atual do Banco Central, o ponto de partida do gráfico.',
        up: [],
        down: [],
        context: '',
      };
    }
    const f = DEBT_FACTORS.find((x) => x.year === year) as DebtFactorYear;
    const before = this.value(year - 1) ?? 0;
    const after = this.value(year) ?? 0;
    const diff = after - before;
    const verb =
      Math.abs(diff) < 0.3
        ? 'ficou praticamente igual'
        : diff > 0
          ? `subiu ${signed(diff).replace('+', '')} pontos`
          : `caiu ${signed(-diff).replace('+', '')} pontos`;
    const text = (key: FactorKey, v: number): string => {
      switch (key) {
        case 'juros':
          return 'Juros pagos sobre a dívida';
        case 'primario':
          return v > 0
            ? 'Governo gastou mais do que arrecadou (déficit)'
            : 'Governo arrecadou mais do que gastou (superávit)';
        case 'pib':
          return v < 0 ? 'PIB cresceu em reais e diluiu a dívida' : 'PIB encolheu em reais';
        default:
          return 'Outros fatores (reservas, bancos públicos, ajustes)';
      }
    };
    // por que cada cor sobe ou desce, em uma frase (substitui uma legenda separada)
    const why = (key: FactorKey, v: number): string => {
      switch (key) {
        case 'juros':
          return 'A dívida rende juros, e o que não é pago vira mais dívida.';
        case 'primario':
          return v > 0
            ? 'Para cobrir a diferença, o governo pega dinheiro emprestado.'
            : 'A sobra serve para abater dívida.';
        case 'pib':
          return v < 0
            ? 'Com a economia maior, a mesma dívida pesa menos. Em reais, o PIB cresceu todos os anos, até em 2020, por causa da inflação.'
            : 'Com a economia menor, a mesma dívida pesa mais.';
        default:
          return 'Compra de dólares para as reservas, empréstimos a bancos públicos, câmbio e ajustes.';
      }
    };
    const items = FACTORS.map(({ key }) => ({
      key,
      n: f[key],
      text: text(key, f[key]),
      why: why(key, f[key]),
      v: signed(f[key]),
    }));
    return {
      title: `${year}: a dívida ${verb}`,
      summary: `Foi de ${pct(before)} para ${pct(after)} do PIB entre dezembro de ${year - 1} e dezembro de ${year}. No gráfico de baixo, é o ponto preto: a soma de tudo o que aumentou e diminuiu a dívida.`,
      // valores que arredondam para zero ficam de fora (evita um “−0,0”)
      up: items.filter((i) => i.n >= 0.05).sort((a, b) => b.n - a.n),
      down: items.filter((i) => i.n <= -0.05).sort((a, b) => a.n - b.n),
      context: DEBT_CONTEXT[year] ?? '',
    };
  });
}
