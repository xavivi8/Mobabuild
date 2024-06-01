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

  findById(id: number): Observable<Rune> {
    return this.httpClient.get<Rune>(`${this.urlMobabuild}/findById/${id}`, this.sharedService.getAuthHeaderWithJson());
  }
}
