import { Routes } from '@angular/router';
import { AngularProjectsPageComponent } from './pages/angular-projects-page.component';
import { HomePageComponent } from './pages/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'other-projects',
    component: AngularProjectsPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
