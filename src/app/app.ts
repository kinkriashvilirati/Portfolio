import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntroOverlayComponent } from './components/intro-overlay/intro-overlay.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IntroOverlayComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly showIntro = signal(true);

  hideIntro(): void {
    this.showIntro.set(false);
  }
}
