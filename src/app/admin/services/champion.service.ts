import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { Champions } from "src/app/shared/interfaces/champions";
import { SharedService } from "src/app/shared/service/shared.service";
import { URL_API } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  private urlMobabuild: string = `${URL_API}/champions`;

  /**
   * @xavivi8
   * @description constructor del champion service
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
   * @description obtiene todos los campeones
   * @returns {Observable<Champions[]>} lista de campeones
   */
  findAll(): Observable<Champions[]> {
    return this.httpClient.get<Champions[]>(`${this.urlMobabuild}/findAll`, this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description agrega un campeon
   * @param {Champions} champion
   * @returns {Observable<Champions>}
   */
  addChampion(champion: Champions): Observable<Champions> {
    return this.httpClient.get<Champions>(`${this.urlMobabuild}/setChampion/${champion.name}`, this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description elimina un campeon
   * @param {Champions} champion
   * @returns {Observable<boolean>}
   */
  deleteChampion(champion: Champions): Observable<boolean> {
    return this.httpClient.delete<string>(`${this.urlMobabuild}/delete/${champion.id}`, { ...this.sharedService.getAuthHeaderWithJson(), observe: 'response' }).pipe(
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
