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

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  public getOneUser(user_id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${user_id}`);
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
    return this.http.put<User>(`${this.baseUrl}/${user_id}`, user);
  }

  public deleteUser(user_id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${user_id}`);
  }
}
