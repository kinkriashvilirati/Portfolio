import { Component, OnDestroy, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';
import { SectionComponent } from '../../components/section/section.component';
import { SocialLink } from '../../data/profile';

@Component({
  selector: 'app-contact-section',
  imports: [SectionComponent, CardComponent, ButtonComponent, ReactiveFormsModule],
  template: `
    <app-section
      sectionId="contact"
      eyebrow="Reach Out"
      title="Contact"
      description="Open to junior frontend roles and internships. Feel free to reach out."
    >
      <div class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <app-card className="space-y-5 p-6 sm:p-7" [interactive]="true">
          <h3 class="font-display text-2xl font-semibold text-foreground">Contact Card</h3>

          <div class="space-y-3 text-sm leading-relaxed text-muted">
            <p>
              <span class="font-semibold text-foreground">Email:</span>
              <a class="ml-1 text-accent hover:text-accent-strong" [href]="'mailto:' + email()">
                {{ email() }}
              </a>
            </p>
            <p>
              <span class="font-semibold text-foreground">Phone:</span>
              <a class="ml-1 text-accent hover:text-accent-strong" [href]="'tel:' + phone()">
                {{ phone() }}
              </a>
            </p>
            <p><span class="font-semibold text-foreground">Location:</span> {{ location() }}</p>
          </div>

          <div class="pt-2">
            <p class="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Social</p>
            <div class="flex flex-wrap gap-2">
              @for (item of social(); track item.label) {
                <app-button [href]="item.url" [external]="item.url !== '#'" variant="secondary" size="sm">
                  {{ item.label }}
                </app-button>
              }
            </div>
          </div>
        </app-card>

        <app-card className="p-6 sm:p-7" [interactive]="true">
          <h3 class="font-display text-2xl font-semibold text-foreground">Send a Message</h3>

          <form class="mt-5 space-y-4" [formGroup]="contactForm" (ngSubmit)="submit()">
            <label class="block">
              <span class="mb-2 block text-sm font-medium text-foreground">Name</span>
              <input
                formControlName="name"
                type="text"
                class="w-full rounded-xl border border-border bg-surface/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/70"
                placeholder="Your name"
              />
              @if (fieldInvalid('name')) {
                <span class="mt-1 block text-xs text-rose-300">Name is required.</span>
              }
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-foreground">Email</span>
              <input
                formControlName="email"
                type="email"
                class="w-full rounded-xl border border-border bg-surface/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/70"
                placeholder="you@example.com"
              />
              @if (fieldInvalid('email')) {
                <span class="mt-1 block text-xs text-rose-300">Enter a valid email address.</span>
              }
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-foreground">Message</span>
              <textarea
                formControlName="message"
                class="h-32 w-full rounded-xl border border-border bg-surface/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/70"
                placeholder="Tell me about your project or role."
              ></textarea>
              @if (fieldInvalid('message')) {
                <span class="mt-1 block text-xs text-rose-300">Message must be at least 10 characters.</span>
              }
            </label>

            <app-button type="submit">Send Message</app-button>
          </form>
        </app-card>
      </div>
    </app-section>

    @if (toastVisible()) {
      <div class="toast-chip fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-400/40 bg-emerald-400/20 px-4 py-3 text-sm text-emerald-100 shadow-soft">
        {{ toastMessage() }}
      </div>
    }
  `,
})
export class ContactSectionComponent implements OnDestroy {
  readonly email = input.required<string>();
  readonly phone = input.required<string>();
  readonly location = input.required<string>();
  readonly social = input<readonly SocialLink[]>([]);

  readonly toastMessage = signal('');
  readonly toastVisible = signal(false);
  readonly submitted = signal(false);

  private readonly formBuilder = inject(FormBuilder);
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit(): void {
    this.submitted.set(true);
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      return;
    }

    const name = this.contactForm.controls.name.value.trim();
    this.toastMessage.set(`Thanks ${name}, message sent successfully.`);
    this.toastVisible.set(true);
    this.contactForm.reset();
    this.submitted.set(false);

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.toastVisible.set(false);
    }, 2600);
  }

  fieldInvalid(controlName: 'name' | 'email' | 'message'): boolean {
    const control = this.contactForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  ngOnDestroy(): void {
    if (!this.toastTimer) {
      return;
    }

    clearTimeout(this.toastTimer);
  }
}
