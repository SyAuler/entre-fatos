import { Component, computed, input } from '@angular/core';

export type TearSide = 'bottom' | 'right' | 'left';

const rand = (min: number, max: number): number => min + Math.random() * (max - min);

/** Amarelo, verde, azul e lilás claros: nenhuma cor de partido, nenhum significado. */
export const POSTIT_COLORS = ['#fdf0a3', '#d3eedb', '#d3e5f7', '#e6dcf5'];

export function shuffledPostitColors(): string[] {
  return [...POSTIT_COLORS].sort(() => Math.random() - 0.5);
}

export function shuffledTearSides(): TearSide[] {
  return (['bottom', 'right', 'left'] as TearSide[]).sort(() => Math.random() - 0.5);
}

/**
 * Bordas rasgadas à mão: muitos pontos miúdos num passeio aleatório, com um ou outro
 * tranco, em vez de dentes regulares. Aceita um ou mais lados; onde dois rasgos se
 * encontram, o canto sai arrancado. Devolve o recorte da folha e o do miolo do
 * papel, que sobra 1–4px além dela.
 */
function tornEdges(sides: TearSide[]): { clip: string; fiber: string } {
  const torn = (side: TearSide): boolean => sides.includes(side);
  // passeio ao longo de uma borda, entre `from`% e `to`% do comprimento dela
  const walk = (from: number, to: number): { pos: number; fiber: number; sheet: number }[] => {
    const points = [];
    let depth = rand(4, 9);
    for (let pos = from; pos <= to; pos += rand(0.5, 1.3)) {
      depth += Math.random() < 0.07 ? rand(-5, 5) : rand(-1.6, 1.6);
      depth = Math.min(13, Math.max(1, depth));
      points.push({ pos, fiber: depth, sheet: depth + rand(1, 4) });
    }
    return points;
  };
  // perto de um canto com dois rasgos, cada borda para um pouco antes
  const right = torn('right') ? walk(0, torn('bottom') ? 96 : 100) : [];
  const bottom = torn('bottom')
    ? walk(torn('left') ? 4 : 0, torn('right') ? 96 : 100).reverse()
    : [];
  const left = torn('left') ? walk(0, torn('bottom') ? 96 : 100).reverse() : [];

  const polygon = (layer: 'fiber' | 'sheet'): string => {
    const px = (d: number): string => `${d.toFixed(1)}px`;
    const at = (pos: number): string => `${pos.toFixed(2)}%`;
    // sentido horário, a partir do canto superior esquerdo (o topo nunca rasga)
    const points = [
      ...(torn('left') ? [] : ['0 0']),
      ...(torn('right') ? [] : ['100% 0']),
      ...right.map((pt) => `calc(100% - ${px(pt[layer])}) ${at(pt.pos)}`),
      ...(torn('right') || torn('bottom') ? [] : ['100% 100%']),
      ...bottom.map((pt) => `${at(pt.pos)} calc(100% - ${px(pt[layer])})`),
      ...(torn('left') || torn('bottom') ? [] : ['0 100%']),
      ...left.map((pt) => `${px(pt[layer])} ${at(pt.pos)}`),
    ];
    return `polygon(${points.join(', ')})`;
  };
  return { clip: polygon('sheet'), fiber: polygon('fiber') };
}

/**
 * Card da página, em três estilos:
 * - `folha`: pilha de folhas timbradas. A cada carregamento sorteia a inclinação,
 *   quantas folhas ficam por baixo (0 a 2), o tamanho e a posição de cada uma e o
 *   lado rasgado da folha da frente.
 * - `jornal`: recorte de jornal impresso, com cabeçalho e papel-jornal; também
 *   sorteia inclinação e rasgo, com no máximo uma página por baixo.
 * - `postit`: bilhete adesivo, levemente torto, em amarelo, verde ou azul claros.
 * - `liso`: card branco e reto, para dar descanso entre os outros.
 */
@Component({
  selector: 'app-paper',
  host: { '[class]': 'variant()' },
  template: `
    <div [class]="'stack ' + variant()" [style.--tilt]="look().tilt" [style.--note]="look().note">
      @for (b of look().backs; track $index) {
        <div
          class="back"
          aria-hidden="true"
          [style.inset]="b.inset"
          [style.--shift]="b.shift"
          [style.--turn]="b.turn"
        >
          @if (variant() === 'folha') {
            <div [class]="'letterhead ' + letterhead()">
              @if (letterhead() === 'full') {
                <span>Política sem Gritos</span><small>leia, compare, decida</small>
              }
            </div>
          }
        </div>
      }
      <div class="front">
        @if (look().fiber; as fiber) {
          <!-- miolo do papel aparecendo na borda rasgada -->
          <div class="fiber" aria-hidden="true" [style.clip-path]="fiber"></div>
        }
        <div
          [class]="'sheet ' + look().tear"
          [class.faixa]="faixa()"
          [style.clip-path]="look().clip"
        >
          @if (variant() === 'folha') {
            <div [class]="'letterhead ' + letterhead()" aria-hidden="true">
              @if (letterhead() === 'full') {
                <span>Política sem Gritos</span><small>leia, compare, decida</small>
              }
            </div>
          }
          @if (variant() === 'liso' && faixa()) {
            <div class="letterhead slim" aria-hidden="true"></div>
          }
          @if (variant() === 'jornal') {
            <div class="masthead" aria-hidden="true">
              <small>{{ rotulo() }}</small
              ><span>Política sem Gritos</span><small>leia, compare, decida</small>
            </div>
          }
          <div class="body"><ng-content /></div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }

    .stack {
      position: relative;
      height: 100%;
      transform: rotate(calc(var(--tilt) * var(--paper-tilt-scale, 1)));
    }

    // A sombra fica nos invólucros (drop-shadow), porque o clip-path cortaria um
    // box-shadow na própria folha.
    .back,
    .front {
      filter: drop-shadow(0 1px 1px rgba(50, 42, 28, 0.3))
        drop-shadow(3px 6px 6px rgba(50, 42, 28, 0.16))
        drop-shadow(8px 16px 18px rgba(50, 42, 28, 0.12));
    }

    .back,
    .sheet,
    .fiber {
      background: #fff url('/papel.svg');
    }

    .back {
      position: absolute;
      overflow: hidden;
      transform: translate(calc(var(--shift) * var(--paper-tilt-scale, 1)), 0)
        rotate(calc(var(--turn) * var(--paper-tilt-scale, 1)));
    }

    .front {
      position: relative;
      height: 100%;
    }

    // um tom mais cru, visível só na beirada do rasgo
    .fiber {
      position: absolute;
      inset: 0;
      background-color: #e9e2d0;
      background-blend-mode: multiply;
    }

    .sheet {
      position: relative;
      height: 100%;
    }

    .body {
      padding: 1.3rem 1.5rem 1.5rem;
    }

    // folga para o texto não encostar na borda rasgada
    .tear-bottom .body {
      padding-bottom: 2.6rem;
    }
    .tear-right .body {
      padding-right: 2.2rem;
    }
    .tear-left .body {
      padding-left: 2.2rem;
    }

    // Timbre discreto: filete verde, amarelo e azul no topo da folha.
    .letterhead.slim {
      height: 7px;
      background: linear-gradient(
        90deg,
        var(--verde) 0 58%,
        var(--amarelo) 58% 70%,
        var(--azul) 70%
      );
    }

    // Timbre completo: bloco verde com a marca, faixa azul à direita e filete amarelo.
    .letterhead.full {
      position: relative;
      height: 4.6rem;
      border-bottom: 4px solid var(--amarelo);
      background: linear-gradient(var(--azul), var(--azul)) right top / 100% 1.5rem no-repeat;

      &::before {
        content: '';
        position: absolute;
        inset: 0 25% 0 0;
        background: var(--verde);
        clip-path: polygon(0 0, 100% 0, calc(100% - 2.4rem) 100%, 0 100%);
      }

      span,
      small {
        position: absolute;
        left: 1.5rem;
        white-space: nowrap;
      }

      span {
        top: 0.85rem;
        color: #fff;
        font-family: Georgia, serif;
        font-size: 1.45rem;
        font-weight: 700;
        letter-spacing: 0.03em;
        line-height: 1;
      }

      small {
        top: 2.75rem;
        color: var(--amarelo);
        font-size: 0.76rem;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
    }

    .tear-left .letterhead.full span,
    .tear-left .letterhead.full small {
      left: 2.2rem;
    }

    // ----- jornal: papel-jornal amarelado e cabeçalho entre fios -----
    .jornal .back,
    .jornal .sheet {
      background-color: #f1ecdf;
      background-blend-mode: multiply;
    }
    .jornal .fiber {
      background-color: #d9d0b8;
    }

    .masthead {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: baseline;
      gap: 0.8rem;
      margin: 0 1.5rem;
      padding: 0.85rem 0 0.4rem;
      border-bottom: 4px double #12304f;
      color: #12304f;

      span {
        font-family: 'Old English Text MT', 'Times New Roman', Georgia, serif;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        line-height: 1;
      }

      small {
        font-size: 0.76rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;

        &:last-child {
          text-align: right;
        }
      }
    }
    .tear-left .masthead {
      margin-left: 2.2rem;
    }
    .tear-right .masthead {
      margin-right: 2.2rem;
    }
    .jornal .body {
      padding-top: 1rem;
    }

    // ----- postit: bilhete adesivo, com a ponta de baixo levantando -----
    .postit .front {
      filter: drop-shadow(0 1px 1px rgba(50, 42, 28, 0.25));
    }
    .postit .sheet {
      // faixa da cola no topo, um pouco mais fechada
      background: linear-gradient(rgba(0, 0, 0, 0.045), rgba(0, 0, 0, 0) 1.6rem), var(--note);
      border-bottom-right-radius: 3.2rem 0.5rem;
    }
    // sombra maior num dos cantos, como papel descolando da superfície
    .postit .front::after {
      content: '';
      position: absolute;
      z-index: -1;
      right: 0.5rem;
      bottom: 0.45rem;
      width: 55%;
      height: 1.4rem;
      box-shadow: 0 0.8rem 0.9rem rgba(50, 42, 28, 0.38);
      transform: rotate(3.5deg);
    }
    .postit .body {
      padding: 1.5rem 1.2rem 1.4rem;
    }

    // liso com a faixa verde, amarela e azul no lugar do filete verde
    .liso .sheet.faixa {
      border-top: 0;
      overflow: hidden;
    }

    // ----- liso: card branco e reto -----
    .liso .front {
      filter: none;
    }
    .liso .sheet {
      background: #fff;
      border: 1px solid var(--linha);
      border-top: 3px solid var(--verde);
      border-radius: 6px;
      box-shadow:
        0 1px 2px rgba(60, 50, 30, 0.06),
        0 10px 22px -14px rgba(60, 50, 30, 0.28);
    }

    // telas médias: o cabeçalho do jornal fica só com o rótulo e o nome (a frase não cabe)
    @media (max-width: 700px) {
      .masthead {
        grid-template-columns: auto 1fr;

        span {
          order: -1;
        }
        small:last-child {
          display: none;
        }
        small {
          text-align: right;
        }
      }
    }

    @media (max-width: 480px) {
      .body {
        padding: 1.1rem 1.1rem 1.3rem;
      }
      .tear-right .body {
        padding-right: 1.7rem;
      }
      .tear-left .body {
        padding-left: 1.7rem;
      }
      .masthead {
        grid-template-columns: auto 1fr;
        margin-inline: 1.1rem;

        span {
          order: -1;
          font-size: 1.3rem;
        }
        small:last-child {
          display: none;
        }
        small {
          text-align: right;
        }
      }
      .letterhead.full {
        height: 4rem;

        &::before {
          right: 12%;
        }
        span {
          left: 1.1rem;
          font-size: 1.25rem;
        }
        small {
          left: 1.1rem;
          top: 2.4rem;
          font-size: 0.76rem;
        }
      }
    }
  `,
})
export class PaperStack {
  readonly variant = input<'folha' | 'jornal' | 'postit' | 'liso'>('folha');
  /** No card `liso`, troca o filete verde do topo pela faixa verde, amarela e azul. */
  readonly faixa = input(false);
  /** Liga as folhas extras por baixo (0 a 2, sorteadas). Desligado: uma folha só por card. */
  readonly pilha = input(false);
  /** Cor do bilhete (`postit`). Sem valor, é sorteada. */
  readonly cor = input<string>();
  /** Rótulo da seção no cabeçalho do jornal (ex.: "Análise"). */
  readonly rotulo = input('');
  readonly letterhead = input<'full' | 'slim'>('slim');
  /** Inclinação máxima da folha da frente, em graus. Cards largos pedem menos. */
  readonly tilt = input(1.2);
  /** Lado(s) do rasgo. Sem valor, um lado é sorteado — e a folha pode sair inteira. */
  readonly tear = input<TearSide | TearSide[]>();

  protected readonly look = computed(() => {
    const variant = this.variant();
    if (variant === 'liso') {
      return { tilt: '0deg', tear: '', clip: null, fiber: null, backs: [], note: null };
    }
    if (variant === 'postit') {
      const side = Math.random() < 0.5 ? -1 : 1;
      return {
        tilt: `${(side * rand(0.8, 2.8)).toFixed(2)}deg`,
        tear: '',
        clip: null,
        fiber: null,
        backs: [],
        note: this.cor() ?? POSTIT_COLORS[Math.floor(rand(0, POSTIT_COLORS.length))],
      };
    }
    const max = this.tilt();
    const sign = Math.random() < 0.5 ? -1 : 1;
    const asked = this.tear();
    const sides = asked ? [asked].flat() : Math.random() < 0.3 ? [] : [shuffledTearSides()[0]];
    const edge = sides.length ? tornEdges(sides) : { clip: null, fiber: null };
    const backCount = this.pilha() ? Math.floor(rand(0, variant === 'jornal' ? 2 : 3)) : 0;
    return {
      tilt: `${(sign * rand(max * 0.4, max)).toFixed(2)}deg`,
      tear: sides.map((side) => `tear-${side}`).join(' '),
      ...edge,
      note: null,
      backs: Array.from({ length: backCount }, (_, b) => ({
        // folhas de trás um pouco maiores ou menores que a da frente
        inset: `${rand(-5, 6).toFixed(0)}px ${rand(-4, 5).toFixed(0)}px ${rand(-6, 5).toFixed(0)}px ${rand(-4, 5).toFixed(0)}px`,
        shift: `${rand(-7, 7).toFixed(0)}px`,
        turn: `${((b === 0 ? -sign : sign) * rand(max * 1.3, max * 2.6)).toFixed(2)}deg`,
      })),
    };
  });
}
