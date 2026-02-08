import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { ContainerComponent } from '../../components/container/container.component';
import { NavLink, SectionId } from '../../data/profile';
import { ThemeMode } from '../../styles/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, ContainerComponent],
  template: `
    <header class="sticky top-0 z-40 border-b border-border/60 bg-bg/75 backdrop-blur-xl">
      <app-container className="py-3">
        <div class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="rounded-xl border border-border/70 bg-surface px-3 py-1.5 font-display text-sm font-semibold tracking-[0.18em] text-foreground transition hover:border-accent/70 hover:text-accent"
            (click)="navigate.emit('about')"
            aria-label="Go to About section"
          >
            RK
          </button>

          <nav class="order-3 w-full md:order-2 md:w-auto md:flex-1" aria-label="Main navigation">
            <ul class="flex items-center gap-1 overflow-x-auto pb-1 md:justify-center md:pb-0">
              @for (link of links(); track link.id) {
                <li>
                  <button
                    type="button"
                    class="group relative rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:text-foreground"
                    [class.text-foreground]="activeSection() === link.id"
                    [attr.aria-current]="activeSection() === link.id ? 'page' : null"
                    (click)="navigate.emit(link.id)"
                  >
                    <span>{{ link.label }}</span>
                    <span
                      class="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-accent transition-opacity"
                      [class.opacity-100]="activeSection() === link.id"
                      [class.opacity-0]="activeSection() !== link.id"
                    ></span>
                  </button>
                </li>
              }
            </ul>
          </nav>

          <div class="ml-auto flex items-center gap-2 md:order-3">
            <button
              type="button"
              class="rounded-xl border border-border bg-surface p-2 text-muted transition hover:border-accent/60 hover:text-foreground"
              (click)="toggleTheme.emit()"
              [attr.aria-label]="theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              @if (theme() === 'dark') {
                <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="1.8">
                  <path d="M12 3v2.3m0 13.4V21m9-9h-2.3M5.3 12H3m15.07 6.37-1.62-1.62M7.55 7.55 5.93 5.93m12.14 0-1.62 1.62M7.55 16.45l-1.62 1.62" />
                  <circle cx="12" cy="12" r="4.2"></circle>
                </svg>
              } @else {
                <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="1.8">
                  <path d="M21 14.6A8.6 8.6 0 1 1 9.4 3a7.2 7.2 0 0 0 11.6 11.6Z"></path>
                </svg>
              }
            </button>

            <app-button
              variant="secondary"
              size="sm"
              href="/cv.pdf"
              download="Rati-Kinkriashvili-CV.pdf"
              ariaLabel="Download CV"
            >
              Download CV
            </app-button>

            <app-button size="sm" (pressed)="viewPortfolio.emit()">View Portfolio</app-button>
          </div>
        </div>
      </app-container>
    </header>
  `,
})
export class NavbarComponent {
  readonly links = input<readonly NavLink[]>([]);
  readonly activeSection = input<SectionId>('about');
  readonly theme = input<ThemeMode>('dark');

  readonly navigate = output<SectionId>();
  readonly viewPortfolio = output<void>();
  readonly toggleTheme = output<void>();
}
