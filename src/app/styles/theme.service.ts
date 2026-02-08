import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'rk-theme';
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<ThemeMode>('dark');

  constructor() {
    const initialTheme = this.readStoredTheme() ?? this.readSystemTheme();
    this.theme.set(initialTheme);

    effect(() => {
      const currentTheme = this.theme();
      this.document.documentElement.setAttribute('data-theme', currentTheme);
      this.document.documentElement.style.setProperty('color-scheme', currentTheme);
      this.persistTheme(currentTheme);
    });
  }

  toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  private readStoredTheme(): ThemeMode | null {
    try {
      const value = localStorage.getItem(this.storageKey);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }

  private persistTheme(theme: ThemeMode): void {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // Ignore storage restrictions and keep in-memory state.
    }
  }

  private readSystemTheme(): ThemeMode {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}
