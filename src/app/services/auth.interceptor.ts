import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> => {
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });

  return next(clonedRequest);
};
