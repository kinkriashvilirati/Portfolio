import { Component, input } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';

@Component({
  selector: 'app-footer-section',
  imports: [ContainerComponent],
  template: `
    <footer class="border-t border-border/70 py-8">
      <app-container>
        <div class="flex flex-col items-start justify-between gap-2 text-sm text-muted sm:flex-row sm:items-center">
          <p>(c) {{ currentYear }} {{ name() }}</p>
          <p>Built with Angular + Tailwind</p>
        </div>
      </app-container>
    </footer>
  `,
})
export class FooterSectionComponent {
  readonly name = input.required<string>();
  readonly currentYear = new Date().getFullYear();
}
