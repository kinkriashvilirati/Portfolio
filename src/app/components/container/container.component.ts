import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-container',
  template: ` <div [class]="classes()"><ng-content></ng-content></div> `,
})
export class ContainerComponent {
  readonly className = input('');

  readonly classes = computed(() => {
    const base = 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8';
    return `${base} ${this.className()}`.trim();
  });
}
