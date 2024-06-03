import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { Build } from "src/app/shared/interfaces/build";
import { Champions } from "src/app/shared/interfaces/champions";
import { User } from "src/app/shared/interfaces/user";
import { SharedService } from "src/app/shared/service/shared.service";
import { URL_API } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  private urlMobabuild: string = `${URL_API}/build`;

  /**
   * @xavivi8
   * @description constructor
   * @param {SharedService} sharedService
   * @param {HttpClient} httpClient
   */
  constructor(
    private sharedService: SharedService,
    private httpClient: HttpClient
  ) { }

  /**
   * @xavivi8
   * @description elimina un build
   * @param {number} id
   * @returns {Observable<boolean>}
   */
  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<any>(`${this.urlMobabuild}/${id}`, { ...this.sharedService.getAuthHeaderWithJson(), observe: 'response' }).pipe(
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
        return of(false);
      })
    );
  }

  /**
   * @xavivi8
   * @description obtiene todos los builds
   * @returns {Observable<Build[]>}
   */
  findAll(): Observable<Build[]> {
    return this.httpClient.get<Build[]>(this.urlMobabuild, this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description obtiene los builds por campeon
   * @param {Champions} champion
   * @returns {Observable<Build[]>}
   */
  findByChampion(champion: Champions): Observable<Build[]> {
    return this.httpClient.post<Build[]>(`${this.urlMobabuild}/findByChampion`, JSON.stringify(champion), this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description obtiene los builds por usuario
   * @param {User} user
   * @returns {Observable<Build[]>}
   */
  findByUser(user: User): Observable<Build[]> {
    return this.httpClient.post<Build[]>(`${this.urlMobabuild}/findByUser`, JSON.stringify(user), this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description obtiene un build
   * @param {number} id
   * @returns {Observable<Build>}
   */
  findById(id: number): Observable<Build> {
    return this.httpClient.get<Build>(`${this.urlMobabuild}/findById/${id}`, this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description crea un build
   * @param {Build} build
   * @returns {Observable<Build>}
   */
  create(build: Build): Observable<Build> {
    return this.httpClient.post<Build>(`${this.urlMobabuild}/create`, JSON.stringify(build), this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description actualiza un build
   * @param {Build} build
   * @returns {Observable<Build>}
   */
  update(build: Build): Observable<Build> {
    return this.httpClient.put<Build>(`${this.urlMobabuild}/update`, JSON.stringify(build), this.sharedService.getAuthHeaderWithJson());
  }
}
