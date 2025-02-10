import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../core/environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";
import { userForm } from "../types/userForm.type";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = `${environment.ApiUrl}/users`;

  constructor(private http: HttpClient) {}

  public getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/read-all`);
  }

  public getOneUser(user_id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/read-one/${user_id}`);
  }

  public createUser(user: userForm):
    Observable<User> {
    user.role = "RECEPTIONIST";
    console.log("hey");
    console.log(user);
    return this.http.post<User>(`${environment.ApiUrl}/register`, user);
  }

  public updateUser(user_id: number, user: User): Observable<User> {
    user.role = "RECEPTIONIST";
    return this.http.put<User>(`${this.baseUrl}/update/${user_id}`, user);
  }

  public deleteUser(user_id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${user_id}`);
  }
}
