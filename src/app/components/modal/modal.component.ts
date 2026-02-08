import { Component, HostListener, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" (click)="requestClose()">
        <div class="modal-backdrop absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

        <div
          [class]="panelClasses()"
          role="dialog"
          [attr.aria-label]="title()"
          aria-modal="true"
          (click)="$event.stopPropagation()"
        >
          <div class="mb-6 flex items-start justify-between gap-6">
            <h3 class="text-2xl font-semibold tracking-tight text-foreground">
              {{ title() }}
            </h3>

            <button
              type="button"
              class="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted transition hover:border-accent/60 hover:text-foreground"
              (click)="requestClose()"
              aria-label="Close dialog"
            >
              Close
            </button>
          </div>

          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  readonly open = input(false);
  readonly title = input('Dialog');
  readonly panelClass = input('');
  readonly closed = output<void>();

  readonly panelClasses = computed(() => {
    const base =
      'modal-panel relative w-full max-w-3xl rounded-3xl border border-border bg-surface/95 p-6 shadow-elevated sm:p-8';
    return `${base} ${this.panelClass()}`.trim();
  });

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.open()) {
      return;
    }

    this.requestClose();
  }

  requestClose(): void {
    this.closed.emit();
  }
}
