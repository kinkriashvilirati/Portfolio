import { Component, input } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SectionComponent } from '../../components/section/section.component';
import { SkillCategory } from '../../data/profile';

const ICONS: Record<SkillCategory['icon'], string> = {
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  cloud:
    'M7 18a4 4 0 0 1-.7-7.94A5 5 0 0 1 16.5 8 3.7 3.7 0 0 1 18 15.15H7Zm4-8v6m-3-3h6',
  git: 'M16 6a3 3 0 0 1-5.83 1H7.83a3 3 0 1 1 0-2h2.34A3 3 0 1 1 16 6Zm0 12a3 3 0 1 0-5.83-1H7.83a3 3 0 1 0 0 2h2.34A3 3 0 1 0 16 18Z',
  server: 'M4 6h16M4 12h16M4 18h16M7 6v12m10-12v12',
  network: 'M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0M12 20h.01',
  office: 'M5 4h10l4 4v12H5V4Zm10 0v4h4M8 12h8M8 16h6',
};

@Component({
  selector: 'app-skills-section',
  imports: [SectionComponent, CardComponent],
  template: `
    <app-section
      sectionId="skills"
      eyebrow="Capabilities"
      title="Skills"
      description="Core technical stack, tooling, and supporting knowledge areas."
    >
      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        @for (category of skills(); track category.title) {
          <app-card className="h-full p-5 sm:p-6" [interactive]="true">
            <div class="flex items-center gap-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-bg/30">
                <svg
                  viewBox="0 0 24 24"
                  class="h-5 w-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path [attr.d]="iconPath(category.icon)"></path>
                </svg>
              </span>
              <h3 class="font-display text-xl font-semibold text-foreground">{{ category.title }}</h3>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              @for (skill of category.skills; track skill; let index = $index) {
                <span class="skill-chip" [style.animation-delay.ms]="60 + index * 45">{{ skill }}</span>
              }
            </div>
          </app-card>
        }
      </div>
    </app-section>
  `,
})
export class SkillsSectionComponent {
  readonly skills = input<readonly SkillCategory[]>([]);

  iconPath(icon: SkillCategory['icon']): string {
    return ICONS[icon];
  }
}
