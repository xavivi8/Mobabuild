import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from 'src/environments/environments';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ObjectD } from 'src/app/shared/interfaces/object';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  private urlMobabuild: string = `${URL_API}/object`;

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
    return this.httpClient.get<ObjectD>(`${this.urlMobabuild}/findById/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener objeto por ID:', error);
        return throwError('Error al obtener objeto por ID');
      })
    );
  }


  deleteObjectById(id: number): Observable<number> {
    return this.httpClient.get<number>(`${this.urlMobabuild}/deleteById/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar objeto por ID:', error);
        return throwError('Error al eliminar objeto por ID');
      })
    );
  }

  setObject(name: string): Observable<number> {
    return this.httpClient.get<number>(`${this.urlMobabuild}/setObject/${name}`).pipe(
      catchError(error => {
        console.error('Error al establecer objeto:', error);
        return throwError('Error al establecer objeto');
      })
    );
  }
}
