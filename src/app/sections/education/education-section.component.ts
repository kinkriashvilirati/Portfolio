import { Component, input } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SectionComponent } from '../../components/section/section.component';
import { EducationItem } from '../../data/profile';

@Component({
  selector: 'app-education-section',
  imports: [SectionComponent, CardComponent],
  template: `
    <app-section
      sectionId="education"
      eyebrow="Background"
      title="Education"
      description="Academic track and current development path."
    >
      <div class="relative ml-2 border-l border-border/70 pl-6 sm:pl-8">
        @for (item of education(); track item.school + item.program; let index = $index) {
          <div class="timeline-item relative pb-10 last:pb-0" [style.animation-delay.ms]="90 + index * 80">
            <span
              class="absolute -left-[1.78rem] top-3 inline-flex h-3.5 w-3.5 rounded-full border border-accent/60 bg-accent/30"
            ></span>

            <app-card className="p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{{ item.period }}</p>
              <h3 class="mt-2 font-display text-2xl font-semibold text-foreground">{{ item.school }}</h3>
              <p class="mt-1 text-sm font-medium text-accent">{{ item.program }}</p>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ item.description }}</p>
            </app-card>
          </div>
        }
      </div>
    </app-section>
  `,
})
export class EducationSectionComponent {
  readonly education = input<readonly EducationItem[]>([]);
}
