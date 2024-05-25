import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SharedService {
  private username = 'usuarioReadWrite@gmail.com';
  private password = 'UsuarioReadWritePass1';
  private authHeader = `Basic ${btoa(`${this.username}:${this.password}`)}`;

  authHeaderWithJson;


  constructor(
    private http: HttpClient,
  ) {
    this.authHeaderWithJson = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authHeader
      }),
      withCredentials: true
    };
  }

  getAuthHeaderWithJson(){
    return this.authHeaderWithJson;
  }


  private getAuthHeader(): { headers: HttpHeaders, withCredentials: boolean } {
    const username = this.username;
    const password = this.password;
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }),
      withCredentials: true
    };
  }

}
