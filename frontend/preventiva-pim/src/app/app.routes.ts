import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'equipamentos',
        loadComponent: () =>
          import('./pages/equipamentos/equipamentos').then((m) => m.Equipamentos),
      },
      {
        path: 'planos',
        loadComponent: () =>
          import('./pages/planos/planos').then((m) => m.Planos),
      },
      {
        path: 'calendario',
        loadComponent: () =>
          import('./pages/calendario/calendario').then((m) => m.Calendario),
      },
      {
        path: 'execucoes',
        loadComponent: () =>
          import('./pages/execucoes/execucoes').then((m) => m.Execucoes),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];