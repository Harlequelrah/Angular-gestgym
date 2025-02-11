import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Suscription } from "../models/Suscription";
import { environment } from "../../core/environments/environment";
import { HttpClient } from "@angular/common/http";
import { suscriptionForm } from "../types/suscriptionForm.type";

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {
  getSuscriptionsByCustomerId(customer_id: number): Observable<Suscription[]> {
    return this.http.get<Suscription[]>(`${this.baseUrl}/customer/${customer_id}`);
  }
  getSuscriptionsByPackId(pack_id: number): Observable<Suscription[]> {
    return this.http.get<Suscription[]>(`${this.baseUrl}/pack/${pack_id}`);
  }

  private baseUrl: string = `${environment.ApiUrl}/suscriptions`;

  constructor(private http: HttpClient) {}

  public getAllSuscriptions(): Observable<Suscription[]> {
    return this.http.get<Suscription[]>(`${this.baseUrl}`);
  }

  public getOneSuscription(suscription_id: number): Observable<Suscription> {
    return this.http.get<Suscription>(`${this.baseUrl}/${suscription_id}`);
  }

  public createSuscription(suscription: suscriptionForm): Observable<Suscription> {
    return this.http.post<Suscription>(`${this.baseUrl}`, suscription);
  }

  public updateSuscription(suscription_id: number, suscription: Suscription): Observable<Suscription> {
    return this.http.put<Suscription>(`${this.baseUrl}/${suscription_id}`, suscription);
  }

  public deleteSuscription(suscription_id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${suscription_id}`);
  }
}
