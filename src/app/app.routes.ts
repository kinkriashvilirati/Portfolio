import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';
import { OtherProjectsPageComponent } from './pages/other-projects-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'other-projects',
    component: OtherProjectsPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
