import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guards';

export const routes: Routes = [
    //Rotas de autenticação (sem guard, com auth-layout)
    {
        path: '',
        loadComponent: () => 
            import('./layouts/auth-layout/auth-layout')
                .then(m => m.AuthLayoutComponent),
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'login',
                loadComponent: () => 
                    import('./pages/login/login.component')
                        .then(m => m.LoginComponent)
            },
        ]    
},

    //Rotas protegidas (com guard, com main-layout)
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => 
            import('./layouts/main-layout/main-layout')
                .then(m => m.MainLayoutComponent),
        children: [
            { path: 'dashboard', loadComponent: () => 
                import('./pages/dashboard/dashboard').then(m => m.DashboardComponent) },
            { path: 'tarefas', loadComponent: () => 
                import('./pages/tarefas/tarefas').then(m => m.TarefasComponent) },
            { path: 'tarefas/nova', loadComponent: () => 
                import('./pages/tarefa-form/tarefa-form').then(m => m.TarefaFormComponent) },
            { path: 'tarefas/:id/editar', loadComponent: () => 
                import('./pages/tarefa-form/tarefa-form').then(m => m.TarefaFormComponent) },
        ]
            
    },

    // Pagina 404
    { path: '**', redirectTo: 'login'}

];