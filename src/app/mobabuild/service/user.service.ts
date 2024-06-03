import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { AddUserRequest, User } from "src/app/shared/interfaces/user";
import { SharedService } from "src/app/shared/service/shared.service";
import { URL_API } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlMobabuild: string = `${URL_API}/user`;

  /**
   * @xavivi8
   * @description constructor
   * @param {HttpClient} httpClient
   * @param {SharedService} sharedService
   */
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {

  }

  /**
   * @xavivi8
   * @description update user
   * @param {User} user
   * @returns {Observable<User>}
   */
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.urlMobabuild}/update`, JSON.stringify(user), this.sharedService.getAuthHeaderWithJson() );
  }

  /**
   * @xavivi8
   * @description find user
   * @param {number} id
   * @returns {Observable<User>}
   */
  findById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.urlMobabuild}/find/${id}`, this.sharedService.getAuthHeaderWithJson());
  }

}
