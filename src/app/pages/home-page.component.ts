import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AboutSectionComponent } from '../sections/about/about-section.component';
import { ContactSectionComponent } from '../sections/contact/contact-section.component';
import { EducationSectionComponent } from '../sections/education/education-section.component';
import { FooterSectionComponent } from '../sections/footer/footer-section.component';
import { HeroSectionComponent } from '../sections/hero/hero-section.component';
import { NavbarComponent } from '../sections/navbar/navbar.component';
import { ProjectsSectionComponent } from '../sections/projects/projects-section.component';
import { SkillsSectionComponent } from '../sections/skills/skills-section.component';
import { profile, SectionId } from '../data/profile';
import { ThemeService } from '../styles/theme.service';

@Component({
  selector: 'app-home-page',
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    EducationSectionComponent,
    ContactSectionComponent,
    FooterSectionComponent,
  ],
  template: `
    <div class="relative min-h-screen overflow-x-clip bg-bg text-foreground">
      <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div class="bg-blob blob-a"></div>
        <div class="bg-blob blob-b"></div>
        <div class="bg-blob blob-c"></div>
        <div class="noise-overlay"></div>
      </div>

      <app-navbar
        [links]="profileData.navLinks"
        [activeSection]="activeSection()"
        [theme]="themeService.theme()"
        (navigate)="scrollToSection($event)"
        (viewPortfolio)="scrollToSection('projects')"
        (toggleTheme)="themeService.toggleTheme()"
      />

      <main>
        <app-hero-section
          [headline]="profileData.headline"
          [role]="profileData.role"
          [location]="profileData.location"
          [subline]="profileData.subline"
          [summary]="profileData.summary"
          [availability]="profileData.availability"
          [tech]="profileData.heroTech"
          (seeProjects)="scrollToSection('projects')"
          (contactMe)="scrollToSection('contact')"
        />

        <app-about-section
          [story]="profileData.aboutStory"
          [focus]="profileData.currentFocus"
          [facts]="profileData.quickFacts"
        />

        <app-projects-section [projects]="profileData.projects" />
        <app-skills-section [skills]="profileData.skills" />
        <app-education-section [education]="profileData.education" />

        <app-contact-section
          [email]="profileData.email"
          [phone]="profileData.phone"
          [location]="profileData.location"
          [social]="profileData.social"
        />
      </main>

      <app-footer-section [name]="profileData.name" />
    </div>
  `,
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  readonly profileData = profile;
  readonly activeSection = signal<SectionId>('about');
  readonly themeService = inject(ThemeService);

  private readonly document = inject(DOCUMENT);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private observer: IntersectionObserver | null = null;
  private readonly visibilityRatios = new Map<SectionId, number>();

  constructor() {
    const description =
      'Rati Kinkriashvili portfolio: frontend projects, Angular learning roadmap, technical skills, and contact details.';

    this.titleService.setTitle('Rati Kinkriashvili | Frontend Web Developer');
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Rati Kinkriashvili | Frontend Web Developer',
    });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }

  ngAfterViewInit(): void {
    this.setupScrollSpy();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollToSection(sectionId: SectionId): void {
    const element = this.document.getElementById(sectionId);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection.set(sectionId);
  }

  private setupScrollSpy(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const sections = this.profileData.navLinks
      .map((link) => this.document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    for (const section of sections) {
      this.visibilityRatios.set(section.id as SectionId, 0);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = (entry.target as HTMLElement).id as SectionId;
          this.visibilityRatios.set(sectionId, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let activeId = this.activeSection();
        let maxRatio = -1;

        for (const [sectionId, ratio] of this.visibilityRatios.entries()) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeId = sectionId;
          }
        }

        if (maxRatio > 0) {
          this.activeSection.set(activeId);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-32% 0px -42% 0px',
      },
    );

    for (const section of sections) {
      this.observer.observe(section);
    }
  }
}
