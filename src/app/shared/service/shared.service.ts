import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

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

  isLoggedIn(): boolean {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user: User = JSON.parse(userString);
        return !!user;
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        return false;
      }
    }
    return false;
  }

  doLogout() {
    localStorage.removeItem('user');
    localStorage.clear();
    location.reload();
  }

}
