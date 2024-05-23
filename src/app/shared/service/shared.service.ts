import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SharedService {
  private username = 'usuarioReadWrite@gmail.com';
  private password = 'UsuarioReadWritePass1';
  private authHeader = `Basic ${btoa(`${this.username}:${this.password}`)}`;

  private authHeaderWithJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authHeader
    }),
    withCredentials: true
  };


  constructor(
    private http: HttpClient,
  ) {}

}
