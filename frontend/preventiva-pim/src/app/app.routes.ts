import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Layout } from './components/layout/layout';
import { Assets } from './pages/assets/assets';
import { AssetForm } from './pages/assets/asset-form/asset-form';

export const routes: Routes = [
  // Rota de Login (Sem Sidebar)
  { path: 'login', component: LoginComponent },
  
  // Rota Padrão: Redireciona para o login
  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rotas Privadas (Todas dentro do Layout com Sidebar)
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },

      //Rotas de Equipamentos (Assets)
      { path: 'assets', component: Assets },
      { path: 'assets/novo', component: AssetForm },
      { path: 'assets/editar/:id', component: AssetForm },
      
      // Por enquanto aponta para Dashboard, depois você cria o AssetsComponent
      { path: 'calendar', component: Dashboard },
      { path: 'planos', component: Dashboard } // Rota para Planos de Manutenção, ajuste o componente depois
    ]
  },

  // Rota de "Não Encontrado" (Opcional)
  { path: '**', redirectTo: '/login' }
];