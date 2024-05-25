import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Authority } from "src/app/shared/interfaces/user";
import { URL_API } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
  private urlMobabuild: string = `${URL_API}/authority`;

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

  constructor(private http: HttpClient) { }

  findAll(): Observable<Authority[]> {
    return this.http.get<Authority[]>(`${this.urlMobabuild}/findAll`, this.authHeaderWithJson);
  }

}
