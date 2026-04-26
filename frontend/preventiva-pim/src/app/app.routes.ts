import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardManutencaoComponent } from './pages/dashboard/dashboard';
import { Layout } from './components/layout/layout';
import { Assets } from './pages/assets/assets';
import { AssetForm } from './pages/assets/asset-form/asset-form';
import { authGuard } from './core/guards/auth.guard';
import { PlanosComponent } from './pages/planos/planos';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardManutencaoComponent },
      { path: 'assets', component: Assets },
      { path: 'assets/novo', component: AssetForm },
      { path: 'assets/editar/:id', component: AssetForm },
      { path: 'calendar', component: DashboardManutencaoComponent },
      { path: 'planos', component: PlanosComponent } // Rota para Planos de Manutenção, ajuste o componente depois
    ]
  },
  { path: '**', redirectTo: '/login' }
];