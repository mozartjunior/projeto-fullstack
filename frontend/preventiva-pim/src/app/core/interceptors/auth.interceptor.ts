import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token'); 
    
    const isApiUrl = req.url.startsWith('http://localhost:6060');

    if (token && isApiUrl) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` 
        }
      });
      return next(authReq);
    }
  }
  return next(req);
};