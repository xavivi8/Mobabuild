import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = 'usuarioReadWrite@gmail.com';
    const password = 'UsuarioReadWritePass1';
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    });

    return next.handle(authReq);
  }
}
