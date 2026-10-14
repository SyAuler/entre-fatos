import { Component, input } from '@angular/core';
import { SourceReference } from './models';

@Component({
  selector: 'app-source-links',
  template: `
    <details class="sources">
      <summary>Fontes ({{ sources().length }})</summary>
      <ul>
        @for (s of sources(); track s.url) {
          <li>
            <a [href]="s.url" target="_blank" rel="noopener noreferrer">{{ s.title }} ↗</a>
            <span>{{ s.publisher }} · acesso em {{ formatDate(s.accessedAt) }}</span>
          </li>
        }
      </ul>
    </details>
  `,
  styles: `
    .sources {
      margin-top: 0.6rem;
      font-size: 0.85rem;
    }
    summary {
      cursor: pointer;
      color: var(--verde);
      font-weight: 600;
      width: fit-content;
    }
    ul {
      list-style: none;
      margin: 0.4rem 0 0;
      padding: 0.5rem 0.75rem;
      border-left: 3px solid var(--amarelo);
      background: #fffdf5;
    }
    li + li {
      margin-top: 0.45rem;
    }
    a {
      color: var(--azul);
      display: block;
      overflow-wrap: anywhere;
    }
    span {
      color: var(--tinta-suave);
    }
  `,
})
export class SourceLinks {
  readonly sources = input.required<SourceReference[]>();

  protected formatDate(iso: string): string {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }
}
