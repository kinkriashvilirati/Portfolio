import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <article [class]="classes()">
      <ng-content></ng-content>
    </article>
  `,
})
export class CardComponent {
  readonly className = input('');
  readonly interactive = input(false);

  readonly classes = computed(() => {
    const base = 'rounded-2xl border border-border/80 bg-surface/85 p-6 shadow-soft backdrop-blur-xl';
    const hover =
      'transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-45px_var(--color-accent-strong)]';
    return `${base} ${this.interactive() ? hover : ''} ${this.className()}`.trim();
  });
}
