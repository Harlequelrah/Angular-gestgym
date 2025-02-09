import { Injectable } from "@angular/core";
import { userLogin } from "../types/userLogin.type";
import { Observable, take, tap } from "rxjs";
import {  Token } from "../models/token";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";
import { accessToken } from "../types/accessToken.type";
import { refreshToken } from "../types/refreshToken.type";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthService{

    constructor(private http: HttpClient) { }


    login(formValue: userLogin): Observable<Token>{
        return this.http.post<Token>(`${environment.ApiUrl}/login`, formValue).pipe(
            tap(
                (response) => {
                    localStorage.setItem("access_token", response.access_token);
                    if (formValue.stayLoggedIn)
                    {
                        localStorage.setItem("refresh_token", response.refresh_token);
                    }
                }
            )
        );

    }
    logout(): void{
        localStorage.clear();

    }



    refreshToken(refresh_token: refreshToken): Observable<accessToken>{
        return this.http.post<accessToken>(`${environment.ApiUrl}/refresh-token`, refresh_token).pipe(
            take(1),
            tap(
                (response: accessToken) => {
                    localStorage.setItem("access_token", response.access_token)
                }
            )
        );
    }

}
