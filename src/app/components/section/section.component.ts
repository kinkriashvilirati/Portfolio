import { Component, computed, input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { RevealOnScrollDirective } from '../reveal-on-scroll.directive';

@Component({
  selector: 'app-section',
  imports: [ContainerComponent, RevealOnScrollDirective],
  template: `
    <section
      [id]="sectionId()"
      [appRevealOnScroll]="reveal()"
      [attr.data-observe-section]="observeForNav() ? sectionId() : null"
      [class]="sectionClasses()"
    >
      <app-container>
        @if (title()) {
          <div class="max-w-2xl">
            @if (eyebrow()) {
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                {{ eyebrow() }}
              </p>
            }
            <h2 class="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {{ title() }}
            </h2>
            @if (description()) {
              <p class="mt-4 text-lg leading-relaxed text-muted">
                {{ description() }}
              </p>
            }
          </div>
        }

        <div [class.mt-10]="title()"><ng-content /></div>
      </app-container>
    </section>
  `,
})
export class SectionComponent {
  readonly sectionId = input.required<string>();
  readonly title = input('');
  readonly eyebrow = input('');
  readonly description = input('');
  readonly className = input('');
  readonly reveal = input(true);
  readonly observeForNav = input(true);

  readonly sectionClasses = computed(() => {
    const base = 'relative py-20 sm:py-24';
    return `${base} ${this.className()}`.trim();
  });
}
