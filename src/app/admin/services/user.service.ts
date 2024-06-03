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

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {

  }

  /**
   * @xavivi8
   * @description find all users
   * @returns {Observable<User[]>}
   */
  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.urlMobabuild}/findAll`, this.sharedService.getAuthHeaderWithJson());
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
   * @description Add a new user
   * @param {AddUserRequest} addUserRequest
   * @returns {User} Observable<User>
   */
  addUserWithoutImage(addUserRequest: AddUserRequest): Observable<User> {
    return this.httpClient.post<User>(`${this.urlMobabuild}/add`, JSON.stringify(addUserRequest), this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description delete user by id
   * @param {number} id number
   * @returns {Observable<boolean>}
   */
  deleteUserById(id: number): Observable<boolean> {
    return this.httpClient.delete<string>(`${this.urlMobabuild}/delete/${id}`, { ...this.sharedService.getAuthHeaderWithJson(), observe: 'response' }).pipe(
      map(response => {
        if (response.status === 200) {
          console.log('User deleted successfully');
          return true;
        } else {
          console.log('Failed to delete user');
          return false;
        }
      }),
      catchError(error => {
        console.error('Error deleting user:', error);
        return of(false); // Devuelve false en caso de error
      })
    );
  }
}
