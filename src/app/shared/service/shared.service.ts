import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SharedService {
  username = 'usuarioReadWrite@gmail.com';
  password = 'UsuarioReadWritePass1';
  authUserPass = `Basic ${btoa(`${this.username}:${this.password}`)}`;

  authHeaderWithJson = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: this.authUserPass
    }
  };

  authHeader = {
    Authorization: this.authUserPass
  }

  constructor(
    private http: HttpClient,
  ) {}

}
