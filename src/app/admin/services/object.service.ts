import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from 'src/environments/environments';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ObjectD } from 'src/app/shared/interfaces/object';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  //Credciales para el acceso a la API: , { withCredentials: true } por si hace falta

  private urlMobabuild: string = `${URL_API}/object`;
  objectds: ObjectD[] = [];

  constructor(private httpClient: HttpClient) { }

  getAllObjects(): Observable<ObjectD[]> {
    return this.httpClient.get<ObjectD[]>(`${this.urlMobabuild}/findAll`);
  }

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

  getObjectById(id: number): Observable<ObjectD> {
    return this.httpClient.get<ObjectD>(`${this.urlMobabuild}/findById/${id}`)
  }


  deleteObjectById(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.urlMobabuild}/deleteById/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el objeto:', error);
        return of(false);
      })
    );
  }


  setObject(name: string): Observable<number> {
    return this.httpClient.get<number>(`${this.urlMobabuild}/setObject/${name}`)
  }
}
