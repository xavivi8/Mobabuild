import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

  addChampion(champion: Champions): Observable<Champions> {
    return this.httpClient.get<Champions>(`${this.urlMobabuild}/setChampion/${champion.name}`, this.sharedService.getAuthHeaderWithJson());
  }

}
