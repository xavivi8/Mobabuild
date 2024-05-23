import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddUserRequest, User } from "src/app/shared/interfaces/user";
import { URL_API } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlMobabuild: string = `${URL_API}/user`;

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

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.urlMobabuild}/findAll`, this.authHeaderWithJson);
  }

  findById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.urlMobabuild}/find/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.urlMobabuild}/update`, JSON.stringify(user), this.authHeaderWithJson );
  }

  addUserWithoutImage(addUserRequest: AddUserRequest): Observable<User> {
    console.log(addUserRequest);

    console.log(JSON.stringify(addUserRequest));

    return this.httpClient.post<User>(`${this.urlMobabuild}/add`, JSON.stringify(addUserRequest), this.authHeaderWithJson);
  }
}
