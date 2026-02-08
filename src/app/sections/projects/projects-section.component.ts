import { Component, computed, input, signal } from '@angular/core';
import { BadgeComponent } from '../../components/badge/badge.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { SectionComponent } from '../../components/section/section.component';
import { Project } from '../../data/profile';
import { TextCompareDemoComponent } from './text-compare-demo.component';

@Component({
  selector: 'app-projects-section',
  imports: [
    SectionComponent,
    CardComponent,
    BadgeComponent,
    ButtonComponent,
    ModalComponent,
    TextCompareDemoComponent,
  ],
  template: `
    <app-section
      sectionId="projects"
      eyebrow="Work"
      title="Projects"
      description="Featured builds focused on reusable architecture, API integrations, and user-centered interface quality."
    >
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Each project includes clear role impact, production-oriented decisions, and the main technical lessons.
        </p>

        <app-button routerLink="/angular-projects" variant="secondary">
          Angular Projects
        </app-button>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        @for (project of projects(); track project.id) {
          <app-card [interactive]="true" className="group flex h-full flex-col p-5 sm:p-6">
            <button
              type="button"
              class="relative overflow-hidden rounded-2xl border border-border/60 bg-bg/20"
              (click)="openProject(project)"
              [attr.aria-label]="'Open details for ' + project.title"
            >
              <img
                [src]="project.image"
                [alt]="project.title + ' UI mock screenshot'"
                class="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </button>

            <div class="mt-5 flex flex-1 flex-col space-y-4">
              <div class="flex items-start justify-between gap-3">
                <h3 class="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {{ project.title }}
                </h3>
                @if (project.featured) {
                  <app-badge variant="accent">Featured</app-badge>
                }
              </div>

              <p class="text-sm leading-relaxed text-muted">{{ project.summary }}</p>

              <ul class="space-y-2 text-sm text-foreground">
                @for (point of project.roleImpact; track point) {
                  <li class="flex items-start gap-2">
                    <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent"></span>
                    <span>{{ point }}</span>
                  </li>
                }
              </ul>

              @if (project.features?.length) {
                <div class="rounded-xl border border-border/60 bg-bg/20 p-3">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Core Features</p>
                  <ul class="mt-2 space-y-1 text-sm text-foreground">
                    @for (feature of project.features; track feature) {
                      <li>- {{ feature }}</li>
                    }
                  </ul>
                </div>
              }

              <p class="text-sm leading-relaxed text-muted">{{ project.learned }}</p>

              @if (project.interactiveDemo) {
                <app-text-compare-demo />
              }

              <div class="flex flex-wrap gap-2">
                @for (tech of project.tech; track tech) {
                  <app-badge>{{ tech }}</app-badge>
                }
              </div>

              <div class="mt-auto flex flex-wrap gap-3 pt-1">
                <app-button [href]="project.liveUrl" [external]="true">Live Demo</app-button>
                <app-button [href]="project.githubUrl" [external]="true" variant="secondary">
                  GitHub
                </app-button>
              </div>

              <button
                type="button"
                class="self-start text-sm font-medium text-accent transition hover:text-accent-strong"
                (click)="openProject(project)"
              >
                View details
              </button>
            </div>
          </app-card>
        }
      </div>
    </app-section>

    <app-modal [open]="isModalOpen()" [title]="modalTitle()" (closed)="closeProject()">
      @if (selectedProject(); as project) {
        <div class="space-y-5">
          <img
            [src]="project.image"
            [alt]="project.title + ' UI mock screenshot'"
            class="h-52 w-full rounded-2xl border border-border/70 object-cover"
            loading="lazy"
          />

          <p class="text-base leading-relaxed text-muted">{{ project.summary }}</p>

          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Role / Impact</p>
            <ul class="mt-3 space-y-2 text-sm text-foreground">
              @for (point of project.roleImpact; track point) {
                <li class="flex items-start gap-2">
                  <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent"></span>
                  <span>{{ point }}</span>
                </li>
              }
            </ul>
          </div>

          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-muted">What I learned</p>
            <p class="mt-2 text-sm leading-relaxed text-foreground">{{ project.learned }}</p>
          </div>

          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Project Breakdown</p>
            <ul class="mt-3 space-y-2 text-sm text-foreground">
              @for (detail of project.details; track detail) {
                <li class="flex items-start gap-2">
                  <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent"></span>
                  <span>{{ detail }}</span>
                </li>
              }
            </ul>
          </div>

          <div class="flex flex-wrap gap-3 pt-2">
            <app-button [href]="project.liveUrl" [external]="true">Live Demo</app-button>
            <app-button [href]="project.githubUrl" [external]="true" variant="secondary">
              GitHub
            </app-button>
          </div>
        </div>
      }
    </app-modal>
  `,
})
export class ProjectsSectionComponent {
  readonly projects = input<readonly Project[]>([]);
  readonly selectedProject = signal<Project | null>(null);

  readonly isModalOpen = computed(() => this.selectedProject() !== null);
  readonly modalTitle = computed(() => this.selectedProject()?.title ?? 'Project details');

  openProject(project: Project): void {
    this.selectedProject.set(project);
  }

  closeProject(): void {
    this.selectedProject.set(null);
  }
}
