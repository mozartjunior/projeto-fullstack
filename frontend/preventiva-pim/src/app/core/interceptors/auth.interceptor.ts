import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Busca o token do LocalStorage (onde você salvou no login)
  const token = localStorage.getItem('token');

  // Se o token existir, clona a requisição e adiciona o Header de Authorization
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};