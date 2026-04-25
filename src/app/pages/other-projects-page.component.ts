import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BadgeComponent } from '../components/badge/badge.component';
import { ButtonComponent } from '../components/button/button.component';
import { CardComponent } from '../components/card/card.component';
import { ContainerComponent } from '../components/container/container.component';
import { RevealOnScrollDirective } from '../components/reveal-on-scroll.directive';
import { profile, ProjectArchiveItem } from '../data/profile';
import { ThemeService } from '../styles/theme.service';

@Component({
  selector: 'app-other-projects-page',
  imports: [
    ContainerComponent,
    CardComponent,
    BadgeComponent,
    ButtonComponent,
    RevealOnScrollDirective,
    RouterLink,
  ],
  template: `
    <div class="relative min-h-screen overflow-x-clip bg-bg text-foreground">
      <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div class="bg-blob blob-a"></div>
        <div class="bg-blob blob-b"></div>
        <div class="bg-blob blob-c"></div>
        <div class="noise-overlay"></div>
      </div>

      <header class="sticky top-0 z-40 border-b border-border/60 bg-bg/75 backdrop-blur-xl">
        <app-container className="py-3">
          <div class="flex flex-wrap items-center gap-3">
            <a
              routerLink="/"
              class="rounded-xl border border-border/70 bg-surface px-3 py-1.5 font-display text-sm font-semibold tracking-[0.18em] text-foreground transition hover:border-accent/70 hover:text-accent"
            >
              RK
            </a>

            <p class="text-sm font-medium text-muted">Project Archive</p>

            <div class="ml-auto flex items-center gap-2">
              <button
                type="button"
                class="rounded-xl border border-border bg-surface p-2 text-muted transition hover:border-accent/60 hover:text-foreground"
                (click)="themeService.toggleTheme()"
                [attr.aria-label]="
                  themeService.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
                "
              >
                @if (themeService.theme() === 'dark') {
                  <svg
                    viewBox="0 0 24 24"
                    class="h-4 w-4 fill-none stroke-current"
                    stroke-width="1.8"
                  >
                    <path
                      d="M12 3v2.3m0 13.4V21m9-9h-2.3M5.3 12H3m15.07 6.37-1.62-1.62M7.55 7.55 5.93 5.93m12.14 0-1.62 1.62M7.55 16.45l-1.62 1.62"
                    />
                    <circle cx="12" cy="12" r="4.2"></circle>
                  </svg>
                } @else {
                  <svg
                    viewBox="0 0 24 24"
                    class="h-4 w-4 fill-none stroke-current"
                    stroke-width="1.8"
                  >
                    <path d="M21 14.6A8.6 8.6 0 1 1 9.4 3a7.2 7.2 0 0 0 11.6 11.6Z"></path>
                  </svg>
                }
              </button>

              <app-button routerLink="/" variant="secondary" size="sm">Back Home</app-button>
            </div>
          </div>
        </app-container>
      </header>

      <main class="pb-20 pt-10 sm:pt-14">
        <app-container>
          <div [appRevealOnScroll]="true" class="max-w-3xl">
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Full Project List
            </p>
            <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Other Projects
            </h1>
            <p class="mt-4 text-lg leading-relaxed text-muted">
              {{ profileData.projectArchiveSummary }}
            </p>
          </div>

          <ol class="relative mt-10 space-y-7">
            @for (item of profileData.projectArchive; track item.id; let index = $index) {
              <li
                class="relative pl-10"
                [appRevealOnScroll]="true"
                [style.transition-delay.ms]="100 + index * 70"
              >
                @if (index < profileData.projectArchive.length - 1) {
                  <span
                    class="absolute left-[0.43rem] top-7 h-[calc(100%+1.3rem)] w-px bg-border/80"
                  ></span>
                }

                <span
                  class="absolute left-0 top-2 inline-flex h-3.5 w-3.5 rounded-full border"
                  [class]="statusDotClass(item)"
                ></span>

                <app-card className="space-y-4">
                  <div class="flex flex-wrap items-start gap-3">
                    <h2 class="font-display text-2xl font-semibold tracking-tight text-foreground">
                      {{ item.title }}
                    </h2>

                    <div class="ml-auto flex flex-wrap items-center gap-2">
                      <span
                        class="inline-flex items-center rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
                      >
                        {{ item.year }}
                      </span>
                      <app-badge [variant]="statusVariant(item)">{{ item.status }}</app-badge>
                    </div>
                  </div>

                  <p class="text-sm leading-relaxed text-muted">{{ item.description }}</p>

                  @if (item.liveUrl !== '#' || item.githubUrl !== '#') {
                    <div class="flex flex-wrap gap-3">
                      @if (item.liveUrl !== '#') {
                        <app-button [href]="item.liveUrl" [external]="true">Live Demo</app-button>
                      }
                      @if (item.githubUrl !== '#') {
                        <app-button [href]="item.githubUrl" [external]="true" variant="secondary">
                          GitHub
                        </app-button>
                      }
                    </div>
                  }
                </app-card>
              </li>
            }
          </ol>
        </app-container>
      </main>
    </div>
  `,
})
export class OtherProjectsPageComponent {
  readonly profileData = profile;
  readonly themeService = inject(ThemeService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  constructor() {
    const description =
      'Full project archive for Rati Kinkriashvili, including featured work, earlier builds, and the current in-progress project.';

    this.titleService.setTitle('Other Projects | Rati Kinkriashvili');
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Other Projects | Rati Kinkriashvili',
    });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }

  statusVariant(item: ProjectArchiveItem): 'success' | 'progress' | 'neutral' {
    if (item.status === 'Done') {
      return 'success';
    }

    if (item.status === 'In Progress') {
      return 'progress';
    }

    return 'neutral';
  }

  statusDotClass(item: ProjectArchiveItem): string {
    if (item.status === 'Done') {
      return 'border-emerald-400/60 bg-emerald-400/30';
    }

    if (item.status === 'In Progress') {
      return 'border-amber-300/60 bg-amber-300/30';
    }

    return 'border-border bg-surface';
  }
}
