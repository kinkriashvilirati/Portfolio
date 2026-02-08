import { Component, input } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SectionComponent } from '../../components/section/section.component';
import { QuickFact } from '../../data/profile';

@Component({
  selector: 'app-about-section',
  imports: [SectionComponent, CardComponent],
  template: `
    <app-section
      sectionId="about"
      eyebrow="Profile"
      title="About"
      description="Focused on building clean interfaces, practical user flows, and maintainable front-end architecture."
    >
      <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>{{ story() }}</p>
          <p>{{ focus() }}</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          @for (fact of facts(); track fact.title) {
            <app-card className="h-full border-border/70 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {{ fact.title }}
              </p>
              <p class="mt-3 text-sm font-medium leading-relaxed text-foreground">
                {{ fact.value }}
              </p>
            </app-card>
          }
        </div>
      </div>
    </app-section>
  `,
})
export class AboutSectionComponent {
  readonly story = input.required<string>();
  readonly focus = input.required<string>();
  readonly facts = input<readonly QuickFact[]>([]);
}
