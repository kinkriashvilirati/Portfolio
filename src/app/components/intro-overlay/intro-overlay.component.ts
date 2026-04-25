import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-intro-overlay',
  templateUrl: './intro-overlay.component.html',
  styleUrl: './intro-overlay.component.css',
})
export class IntroOverlayComponent implements OnInit, OnDestroy {
  readonly finished = output<void>();
  readonly exiting = signal(false);

  readonly lastNameChars = [...'Kinkriashvili'];
  readonly firstNameChars = [...'Rati'];

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private readonly timeoutIds: number[] = [];
  private previousHtmlOverflow = '';
  private previousHtmlOverscrollBehavior = '';
  private previousBodyOverflow = '';
  private previousBodyOverscrollBehavior = '';
  private previousBodyTouchAction = '';
  private readonly blockScroll = (event: Event) => {
    event.preventDefault();
  };
  private readonly blockScrollKeys = (event: KeyboardEvent) => {
    const blockedKeys = new Set([
      'ArrowUp',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End',
      ' ',
    ]);

    if (blockedKeys.has(event.key)) {
      event.preventDefault();
    }
  };

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.lockViewport();

    this.zone.runOutsideAngular(() => {
      this.timeoutIds.push(
        window.setTimeout(() => {
          this.zone.run(() => this.exiting.set(true));
        }, 2550),
      );

      this.timeoutIds.push(
        window.setTimeout(() => {
          this.zone.run(() => this.finished.emit());
        }, 3350),
      );
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    for (const timeoutId of this.timeoutIds) {
      window.clearTimeout(timeoutId);
    }

    this.unlockViewport();
  }

  lastNameDelay(index: number): number {
    return index * 45;
  }

  firstNameDelay(index: number): number {
    return 220 + index * 55;
  }

  private lockViewport(): void {
    const html = this.document.documentElement;
    const body = this.document.body;

    this.previousHtmlOverflow = html.style.overflow;
    this.previousHtmlOverscrollBehavior = html.style.overscrollBehavior;
    this.previousBodyOverflow = body.style.overflow;
    this.previousBodyOverscrollBehavior = body.style.overscrollBehavior;
    this.previousBodyTouchAction = body.style.touchAction;

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    body.style.touchAction = 'none';

    window.addEventListener('wheel', this.blockScroll, { passive: false });
    window.addEventListener('touchmove', this.blockScroll, { passive: false });
    window.addEventListener('keydown', this.blockScrollKeys, { passive: false });
  }

  private unlockViewport(): void {
    const html = this.document.documentElement;
    const body = this.document.body;

    html.style.overflow = this.previousHtmlOverflow;
    html.style.overscrollBehavior = this.previousHtmlOverscrollBehavior;
    body.style.overflow = this.previousBodyOverflow;
    body.style.overscrollBehavior = this.previousBodyOverscrollBehavior;
    body.style.touchAction = this.previousBodyTouchAction;

    window.removeEventListener('wheel', this.blockScroll);
    window.removeEventListener('touchmove', this.blockScroll);
    window.removeEventListener('keydown', this.blockScrollKeys);
  }
}
