import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Build } from "src/app/shared/interfaces/build";
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

  create(build: Build): Observable<Build> {
    return this.httpClient.post<Build>(`${this.urlMobabuild}/create`, JSON.stringify(build), this.sharedService.getAuthHeaderWithJson());
  }
}
