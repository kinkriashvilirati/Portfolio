import { Component, computed, input } from '@angular/core';

type BadgeVariant = 'neutral' | 'accent' | 'success' | 'progress';

@Component({
  selector: 'app-badge',
  template: `
    <span [class]="classes()">
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('neutral');
  readonly className = input('');

  readonly classes = computed(() => {
    const base =
      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]';

    const variants: Record<BadgeVariant, string> = {
      neutral: 'border-border/80 bg-surface text-muted',
      accent: 'border-accent/40 bg-accent/15 text-accent',
      success: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300',
      progress: 'border-amber-300/40 bg-amber-300/15 text-amber-200',
    };

    return `${base} ${variants[this.variant()]} ${this.className()}`.trim();
  });
}
