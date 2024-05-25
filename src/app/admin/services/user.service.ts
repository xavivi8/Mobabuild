import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddUserRequest, User } from "src/app/shared/interfaces/user";
import { SharedService } from "src/app/shared/service/shared.service";
import { URL_API } from "src/environments/environments";

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

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.urlMobabuild}/findAll`, this.sharedService.getAuthHeaderWithJson());
  }

  findById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.urlMobabuild}/find/${id}`, this.sharedService.getAuthHeaderWithJson());
  }

  updateUser(user: User): Observable<User> {
    console.log(user);

    return this.httpClient.put<User>(`${this.urlMobabuild}/update`, JSON.stringify(user), this.sharedService.getAuthHeaderWithJson() );
  }

  /**
   * @description Add a new user
   * @param {AddUserRequest} addUserRequest
   * @returns {User} Observable<User>
   */
  addUserWithoutImage(addUserRequest: AddUserRequest): Observable<User> {
    console.log(addUserRequest);

    console.log(JSON.stringify(addUserRequest));

    return this.httpClient.post<User>(`${this.urlMobabuild}/add`, JSON.stringify(addUserRequest), this.sharedService.getAuthHeaderWithJson());
  }
}
