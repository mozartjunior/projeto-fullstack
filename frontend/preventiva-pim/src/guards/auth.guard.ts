// src/app/guards/auth.guard.ts

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (token) {
    // Por enquanto, se houver QUALQUER coisa no token, permite a entrada
    return true; 
  }

  // Se não tiver nada, volta para o login
  router.navigate(['/login']);
  return false;
};