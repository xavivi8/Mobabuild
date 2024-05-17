import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = 'usuarioReadWrite@gmail.com'; // Reemplaza con tu nombre de usuario
    const password = 'UsuarioReadWritePass1'; // Reemplaza con tu contraseña
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    const authReq = req.clone({
      setHeaders: {
        Authorization: authHeader
      }
    });

    return next.handle(authReq);
  }
}
