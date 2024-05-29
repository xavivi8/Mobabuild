import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Build } from "src/app/shared/interfaces/build";
import { Champions } from "src/app/shared/interfaces/champions";
import { SharedService } from "src/app/shared/service/shared.service";
import { URL_API } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  private urlMobabuild: string = `${URL_API}/build`;

  constructor(
    private sharedService: SharedService,
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<Build[]> {
    return this.httpClient.get<Build[]>(this.urlMobabuild, this.sharedService.getAuthHeaderWithJson());
  }

  findByChampion(champion: Champions): Observable<Build[]> {
    return this.httpClient.post<Build[]>(`${this.urlMobabuild}/findByChampion`, JSON.stringify(champion), this.sharedService.getAuthHeaderWithJson());
  }

  findById(id: number): Observable<Build> {
    return this.httpClient.get<Build>(`${this.urlMobabuild}/findById/${id}`, this.sharedService.getAuthHeaderWithJson());
  }

  create(build: Build): Observable<Build> {
    return this.httpClient.post<Build>(`${this.urlMobabuild}/create`, JSON.stringify(build), this.sharedService.getAuthHeaderWithJson());
  }

  update(build: Build): Observable<Build> {
    return this.httpClient.put<Build>(`${this.urlMobabuild}/update`, JSON.stringify(build), this.sharedService.getAuthHeaderWithJson());
  }


}
