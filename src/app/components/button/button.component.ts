import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  template: `
    <ng-template #buttonContent><ng-content></ng-content></ng-template>

    @if (href()) {
      <a
        [href]="href()!"
        [attr.target]="external() ? '_blank' : null"
        [attr.rel]="external() ? 'noopener noreferrer' : null"
        [attr.download]="download() ?? null"
        [attr.aria-label]="ariaLabel() ?? null"
        [class]="classes()"
        (click)="handleAnchorClick($event)"
      >
        <ng-container [ngTemplateOutlet]="buttonContent"></ng-container>
      </a>
    } @else if (routerLink()) {
      <a
        [routerLink]="routerLink()!"
        [attr.aria-label]="ariaLabel() ?? null"
        [class]="classes()"
        (click)="handleAnchorClick($event)"
      >
        <ng-container [ngTemplateOutlet]="buttonContent"></ng-container>
      </a>
    } @else {
      <button
        [type]="type()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel() ?? null"
        [class]="classes()"
        (click)="handleButtonClick($event)"
      >
        <ng-container [ngTemplateOutlet]="buttonContent"></ng-container>
      </button>
    }
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly href = input<string | null>(null);
  readonly routerLink = input<string | null>(null);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly external = input(false);
  readonly download = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly disabled = input(false);
  readonly className = input('');
  readonly pressed = output<MouseEvent>();

  readonly classes = computed(() => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-xl font-semibold leading-none tracking-[0.01em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-55';

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-accent text-bg shadow-[0_14px_32px_-18px_var(--color-accent-strong)] hover:-translate-y-0.5 hover:bg-accent-strong',
      secondary:
        'border border-border bg-surface/80 text-foreground shadow-soft hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface-strong/80',
      ghost: 'text-muted hover:text-foreground',
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-3.5 py-2 text-sm',
      md: 'px-5 py-2.5 text-sm sm:text-base',
      lg: 'px-6 py-3 text-base',
    };

    return `${base} ${variantStyles[this.variant()]} ${sizeStyles[this.size()]} ${this.className()}`.trim();
  });

  handleAnchorClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    this.pressed.emit(event);
  }

  handleButtonClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    this.pressed.emit(event);
  }
}
