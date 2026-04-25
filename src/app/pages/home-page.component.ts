import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { profile, SectionId } from '../data/profile';
import { AboutSectionComponent } from '../sections/about/about-section.component';
import { ContactSectionComponent } from '../sections/contact/contact-section.component';
import { EducationSectionComponent } from '../sections/education/education-section.component';
import { FooterSectionComponent } from '../sections/footer/footer-section.component';
import { HeroSectionComponent } from '../sections/hero/hero-section.component';
import { NavbarComponent } from '../sections/navbar/navbar.component';
import { ProjectsSectionComponent } from '../sections/projects/projects-section.component';
import { SkillsSectionComponent } from '../sections/skills/skills-section.component';
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
        [lineDirection]="navLineDirection()"
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
  readonly navLineDirection = signal<'forward' | 'backward'>('forward');
  readonly themeService = inject(ThemeService);

  private readonly document = inject(DOCUMENT);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly sectionOrder = new Map<SectionId, number>(
    this.profileData.navLinks.map((link, index) => [link.id, index]),
  );
  private sectionElements: HTMLElement[] = [];
  private readonly viewportSpyHandler = () => this.updateActiveFromViewport();

  constructor() {
    const description =
      'Rati Kinkriashvili portfolio: featured frontend projects, full project archive, technical skills, and contact details.';

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
    this.setupSectionTracking();
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('scroll', this.viewportSpyHandler);
    window.removeEventListener('resize', this.viewportSpyHandler);
  }

  scrollToSection(sectionId: SectionId): void {
    const element = this.document.getElementById(sectionId);
    if (!element) {
      return;
    }

    this.setActiveSection(sectionId);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private setupSectionTracking(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.sectionElements = this.profileData.navLinks
      .map((link) => this.document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    if (this.sectionElements.length === 0) {
      return;
    }

    this.updateActiveFromViewport();
    window.addEventListener('scroll', this.viewportSpyHandler, { passive: true });
    window.addEventListener('resize', this.viewportSpyHandler);
  }

  private updateActiveFromViewport(): void {
    if (this.sectionElements.length === 0 || typeof window === 'undefined') {
      return;
    }

    const anchorY = window.innerHeight * 0.36;
    let bestSection = this.sectionElements[0];
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const section of this.sectionElements) {
      const rect = section.getBoundingClientRect();
      const anchorInside = rect.top <= anchorY && rect.bottom >= anchorY;
      const distance = anchorInside
        ? 0
        : Math.min(Math.abs(rect.top - anchorY), Math.abs(rect.bottom - anchorY));

      if (distance < bestDistance) {
        bestDistance = distance;
        bestSection = section;
      }
    }

    this.setActiveSection(bestSection.id as SectionId);
  }

  private setActiveSection(sectionId: SectionId): void {
    const currentSection = this.activeSection();
    if (currentSection === sectionId) {
      return;
    }

    const currentIndex = this.sectionOrder.get(currentSection) ?? 0;
    const nextIndex = this.sectionOrder.get(sectionId) ?? 0;
    this.navLineDirection.set(nextIndex >= currentIndex ? 'forward' : 'backward');
    this.activeSection.set(sectionId);
  }
}
