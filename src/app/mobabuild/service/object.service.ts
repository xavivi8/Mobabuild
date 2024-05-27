import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from 'src/environments/environments';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ObjectD } from 'src/app/shared/interfaces/object';
import { SharedService } from 'src/app/shared/service/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  //Credciales para el acceso a la API: , { withCredentials: true } por si hace falta

  private urlMobabuild: string = `${URL_API}/object`;
  objectds: ObjectD[] = [];

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
   * @description obtiene todos los objetos
   * @returns {Observable<ObjectD[]>}
   */
  getAllObjects(): Observable<ObjectD[]> {
    return this.httpClient.get<ObjectD[]>(`${this.urlMobabuild}/findAll`, this.sharedService.getAuthHeaderWithJson());
  }
}
