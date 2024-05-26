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
}
