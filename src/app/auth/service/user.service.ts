import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, firstValueFrom, map, of } from "rxjs";
import { AddUserRequest, User } from "src/app/shared/interfaces/user";
import { SharedService } from "src/app/shared/service/shared.service";
import { URL_API } from "src/environments/environments";
import { UserLogin } from "../interfaces/UserLogin";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlMobabuild: string = `${URL_API}/user`;

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {

  }

  findById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.urlMobabuild}/find/${id}`, this.sharedService.getAuthHeaderWithJson());
  }

  login(userLogin: UserLogin): Promise<User> {
    return firstValueFrom(this.httpClient.post<User>(`${this.urlMobabuild}/login`, JSON.stringify(userLogin), this.sharedService.getAuthHeaderWithJson()));
  }

}
