import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";
import { environment } from "../../core/environments/environment";
import { HttpClient } from "@angular/common/http";
import { userForm } from "../types/userForm.type";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = `${environment.ApiUrl}/users`;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/read-all-users`);
  }

  public getOneUser(user_id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/read-one-user/${user_id}`);
  }

  public createUser(user: userForm): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/save-user`, user);
  }

  public updateUser(user_id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update-user/${user_id}`, user);
  }

  public deleteUser(user_id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-user/${user_id}`);
  }
}