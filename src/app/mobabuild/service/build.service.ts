import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
}
