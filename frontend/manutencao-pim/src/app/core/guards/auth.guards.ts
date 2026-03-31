import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.estaAutenticado()) return true;
    
    router.navigate(['/login'], {
        queryParameters: { retorno: state.url }
    });
    return false;
};