import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { Spell } from "src/app/shared/interfaces/spell";
import { SharedService } from "src/app/shared/service/shared.service";
import { URL_API } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  private urlMobabuild: string = `${URL_API}/spell`;

  constructor(
    private sharedService: SharedService,
    private httpClient: HttpClient
  ) { }

  /**
   * @xavivi8
   * @description obtiene todos los spells
   * @returns {Observable<Spell[]>}
   */
  findAll(): Observable<Spell[]> {
    return this.httpClient.get<Spell[]>(`${this.urlMobabuild}/findAll`, this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description elimina un spell
   * @param {Spell} spell
   * @returns {Observable<Spell>}
   */
  delete(spell: Spell): Observable<boolean> {
    return this.httpClient.delete<string>(`${this.urlMobabuild}/deleteById/${spell.id}`, { ...this.sharedService.getAuthHeaderWithJson(), observe: 'response' }).pipe(
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

  /**
   * @xavivi8
   * @description actualiza un spell
   * @param {Spell} spell
   * @returns {Observable<Spell>}
   */
  update(spell: Spell): Observable<Spell> {
    return this.httpClient.put<Spell>(`${this.urlMobabuild}/update`, JSON.stringify(spell), this.sharedService.getAuthHeaderWithJson());
  }

  /**
   * @xavivi8
   * @description crea un spell
   * @param {Spell} spell
   * @returns {Observable<Spell>}
   */
  create(spell: Spell): Observable<Spell> {
    return this.httpClient.post<Spell>(`${this.urlMobabuild}/create`, JSON.stringify(spell), this.sharedService.getAuthHeaderWithJson());
  }
}
