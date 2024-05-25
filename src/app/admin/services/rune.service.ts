import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { Rune } from "src/app/shared/interfaces/rune";
import { SharedService } from "src/app/shared/service/shared.service";
import { URL_API } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class RuneService {
  private urlMobabuild: string = `${URL_API}/rune`;

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
   * @description obtiene todos los runas
   * @returns {Observable<Rune[]>}
   */
  findAll(): Observable<Rune[]> {
    return this.httpClient.get<Rune[]>(`${this.urlMobabuild}/findAll`, this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description crea una runa
   * @param {Rune} rune
   * @returns {Observable<Rune>}
   */
  create(rune: Rune): Observable<Rune> {
    return this.httpClient.post<Rune>(`${this.urlMobabuild}/create`, JSON.stringify(rune), this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description actualiza una runa
   * @param {Rune} rune
   * @returns {Observable<Rune>}
   */
  update(rune: Rune): Observable<Rune> {
    return this.httpClient.put<Rune>(`${this.urlMobabuild}/update`, JSON.stringify(rune), this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description elimina una runa
   * @param {Rune} rune
   * @returns {Observable<boolean>}
   */
  delete(rune: Rune): Observable<boolean> {
    return this.httpClient.delete<string>(`${this.urlMobabuild}/deleteById/${rune.id}`, { ...this.sharedService.getAuthHeaderWithJson(), observe: 'response' }).pipe(
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
