import { Component, input, output } from '@angular/core';
import { BadgeComponent } from '../../components/badge/badge.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';
import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'app-hero-section',
  imports: [SectionComponent, ButtonComponent, BadgeComponent, CardComponent],
  template: `
    <app-section
      sectionId="hero"
      className="pb-16 pt-14 sm:pt-20"
      [observeForNav]="false"
      [reveal]="false"
    >
      <div class="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div class="space-y-7">
          <app-badge variant="progress">{{ availability() }}</app-badge>

          <div class="space-y-5">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {{ role() }} - {{ location() }}
            </p>

            <h1
              class="max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl"
            >
              {{ headline() }}
            </h1>

            <p class="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {{ subline() }}
            </p>

            <p class="max-w-2xl text-base leading-relaxed text-muted">
              {{ summary() }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <app-button size="lg" (pressed)="seeProjects.emit()">See Projects</app-button>
            <app-button size="lg" variant="secondary" (pressed)="contactMe.emit()"
              >Contact Me</app-button
            >
          </div>
        </div>

        <app-card className="hero-stack-card border-accent/30 p-6 sm:p-8" [interactive]="true">
          <p class="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Tech Stack
          </p>

          <div class="flex flex-wrap gap-2.5">
            @for (item of tech(); track item; let index = $index) {
              <span class="hero-tech-pill" [style.animation-delay.ms]="120 + index * 90">
                {{ item }}
              </span>
            }
          </div>
        </app-card>
      </div>
    </app-section>
  `,
})
export class HeroSectionComponent {
  readonly headline = input.required<string>();
  readonly role = input.required<string>();
  readonly location = input.required<string>();
  readonly subline = input.required<string>();
  readonly summary = input.required<string>();
  readonly availability = input.required<string>();
  readonly tech = input<readonly string[]>([]);

  readonly seeProjects = output<void>();
  readonly contactMe = output<void>();
}
