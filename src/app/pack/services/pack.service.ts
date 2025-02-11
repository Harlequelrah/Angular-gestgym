import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pack } from "../models/Pack";
import { environment } from "../../core/environments/environment";
import { HttpClient } from "@angular/common/http";
import { packForm } from "../types/packForm.type";


@Injectable({
  providedIn: 'root'
})
export class PackService {

  private baseUrl: string = `${environment.ApiUrl}/packs`;

  constructor(private http: HttpClient) {}

  public getAllPacks(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.baseUrl}`);
  }

  public getOnePack(pack_id: number): Observable<Pack> {
    return this.http.get<Pack>(`${this.baseUrl}/${pack_id}`);
  }

  public createPack(pack: packForm): Observable<Pack> {
    return this.http.post<Pack>(`${this.baseUrl}`, pack);
  }

  public updatePack(pack_id: number, pack: Pack): Observable<Pack> {
    return this.http.put<Pack>(`${this.baseUrl}/${pack_id}`, pack);
  }

  public deletePack(pack_id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${pack_id}`);
  }
}
