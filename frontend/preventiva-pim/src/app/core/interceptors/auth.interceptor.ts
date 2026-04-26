import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token'); 

    if (token) {
      const authReq = req.clone({
        setHeaders: {
    
          Authorization: `Bearer ${token}` 
        }
      });
      return next(authReq);
    }
  }

  // Se chegou aqui, mandou sem token
  return next(req);
};