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

  /**
   * @xavivi8
   * @description obtiene el primer objeto
   */
  logFirstObject(): void {
    this.getAllObjects().subscribe(objects => {
      if (objects.length > 0) {
        console.log('Primer ObjectD:', objects[0]);
      } else {
        console.log('No se encontraron objetos.');
      }
    }, error => {
      console.error('Error al obtener los objetos:', error);
    });
  }

  /**
   * @xavivi8
   * @description obtiene un objeto por el id
   * @param {number} id
   * @returns {Observable<ObjectD>}
   */
  getObjectById(id: number): Observable<ObjectD> {
    return this.httpClient.get<ObjectD>(`${this.urlMobabuild}/findById/${id}`, this.sharedService.getAuthHeaderWithJson())
  }

  /**
   * @xavivi8
   * @description elimina un objeto
   * @param {number} id
   * @returns {Observable<boolean>}
   */
  deleteObjectById(id: number): Observable<boolean> {
    debugger
    return this.httpClient.get<boolean>(`${this.urlMobabuild}/deleteById/${id}`, this.sharedService.getAuthHeaderWithJson()).pipe(
      catchError(error => {
        console.error('Error al eliminar el objeto:', error);
        return of(false);
      })
    );
  }

  /**
   * @xavivi8
   * @description crea un objeto
   * @param {string} name
   * @returns {Observable<number>}
   */
  setObject(object: ObjectD): Observable<ObjectD> {
    return this.httpClient.post<ObjectD>(`${this.urlMobabuild}/create`, JSON.stringify(object) , this.sharedService.getAuthHeaderWithJson())
  }

  /**
   * @xavivi8
   * @description edita un objeto
   * @param {ObjectD} objectD
   * @returns {Observable<boolean>}
   */
  editObject(objectD: ObjectD): Observable<ObjectD> {
    const url = `${this.urlMobabuild}/update`;
    return this.httpClient.put<ObjectD>(url, JSON.stringify(objectD), this.sharedService.getAuthHeaderWithJson())
  }


}
