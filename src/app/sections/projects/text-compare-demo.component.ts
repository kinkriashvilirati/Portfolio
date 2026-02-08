import { Component, computed, signal } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';

type DiffKind = 'same' | 'added' | 'removed';

interface DiffToken {
  text: string;
  kind: DiffKind;
}

@Component({
  selector: 'app-text-compare-demo',
  imports: [ButtonComponent],
  template: `
    <div class="rounded-2xl border border-border/70 bg-bg/30 p-4">
      <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Mini Demo</p>
      <p class="mt-2 text-sm text-muted">Compare two text blocks and highlight added/removed words.</p>

      <div class="mt-4 grid gap-3 md:grid-cols-2">
        <label class="block">
          <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">Text A</span>
          <textarea
            class="h-24 w-full rounded-xl border border-border bg-surface/60 p-3 text-sm text-foreground outline-none transition focus:border-accent/60"
            [value]="leftText()"
            (input)="setLeftText($event)"
          ></textarea>
        </label>

        <label class="block">
          <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">Text B</span>
          <textarea
            class="h-24 w-full rounded-xl border border-border bg-surface/60 p-3 text-sm text-foreground outline-none transition focus:border-accent/60"
            [value]="rightText()"
            (input)="setRightText($event)"
          ></textarea>
        </label>
      </div>

      <div class="mt-3 flex flex-wrap items-center gap-3">
        <app-button size="sm" (pressed)="compare()">Compare</app-button>
        @if (hasResult()) {
          <p class="text-xs text-muted">
            Added: {{ addedCount() }} - Removed: {{ removedCount() }}
          </p>
        }
      </div>

      <div class="mt-4 min-h-16 rounded-xl border border-border/60 bg-surface/40 p-3 text-sm leading-relaxed">
        @if (!hasResult()) {
          <p class="text-muted">Click compare to see highlighted changes.</p>
        } @else {
          <p>
            @for (token of resultTokens(); track $index) {
              <span [class]="tokenClass(token.kind)">{{ token.text }} </span>
            }
          </p>
        }
      </div>
    </div>
  `,
})
export class TextCompareDemoComponent {
  readonly leftText = signal('Angular helps build responsive user interfaces quickly.');
  readonly rightText = signal('Angular helps build fast and responsive web interfaces efficiently.');
  readonly resultTokens = signal<DiffToken[]>([]);
  readonly hasResult = signal(false);

  readonly addedCount = computed(
    () => this.resultTokens().filter((token) => token.kind === 'added').length,
  );
  readonly removedCount = computed(
    () => this.resultTokens().filter((token) => token.kind === 'removed').length,
  );

  setLeftText(event: Event): void {
    this.leftText.set((event.target as HTMLTextAreaElement).value);
  }

  setRightText(event: Event): void {
    this.rightText.set((event.target as HTMLTextAreaElement).value);
  }

  compare(): void {
    const leftTokens = this.tokenize(this.leftText());
    const rightTokens = this.tokenize(this.rightText());
    this.resultTokens.set(this.diffWords(leftTokens, rightTokens));
    this.hasResult.set(true);
  }

  tokenClass(kind: DiffKind): string {
    if (kind === 'added') {
      return 'rounded px-1.5 py-0.5 bg-emerald-400/20 text-emerald-200';
    }

    if (kind === 'removed') {
      return 'rounded px-1.5 py-0.5 bg-rose-400/20 text-rose-200 line-through';
    }

    return 'text-foreground';
  }

  private tokenize(value: string): string[] {
    return value
      .trim()
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length > 0);
  }

  private diffWords(left: string[], right: string[]): DiffToken[] {
    const rowCount = left.length + 1;
    const columnCount = right.length + 1;
    const matrix = Array.from({ length: rowCount }, () => Array<number>(columnCount).fill(0));

    for (let i = left.length - 1; i >= 0; i -= 1) {
      for (let j = right.length - 1; j >= 0; j -= 1) {
        matrix[i][j] =
          left[i] === right[j] ? matrix[i + 1][j + 1] + 1 : Math.max(matrix[i + 1][j], matrix[i][j + 1]);
      }
    }

    const tokens: DiffToken[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] === right[j]) {
        tokens.push({ text: left[i], kind: 'same' });
        i += 1;
        j += 1;
      } else if (matrix[i + 1][j] >= matrix[i][j + 1]) {
        tokens.push({ text: left[i], kind: 'removed' });
        i += 1;
      } else {
        tokens.push({ text: right[j], kind: 'added' });
        j += 1;
      }
    }

    while (i < left.length) {
      tokens.push({ text: left[i], kind: 'removed' });
      i += 1;
    }

    while (j < right.length) {
      tokens.push({ text: right[j], kind: 'added' });
      j += 1;
    }

    return tokens;
  }
}
