import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Authority } from "src/app/shared/interfaces/user";
import { URL_API } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
  private urlMobabuild: string = `${URL_API}/authority`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Authority[]> {
    return this.http.get<Authority[]>(this.urlMobabuild);
  }

}
