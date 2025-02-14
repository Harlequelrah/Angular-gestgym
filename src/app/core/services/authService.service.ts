import { Injectable } from "@angular/core";
import { userLogin } from "../types/userLogin.type";
import { catchError, Observable, take, tap } from "rxjs";
import {  Token } from "../models/token";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";
import { accessToken } from "../types/accessToken.type";
import { refreshToken } from "../types/refreshToken.type";
import { ErrorHandlerService } from "./ErrorHandlerService.service";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthService{

    constructor(
        private http: HttpClient,
        private router:Router,
        private errorHandler:ErrorHandlerService) { }


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
            ),
            catchError(err => this.errorHandler.handleError(err,'    Échec de la connexion.Veuillez vérifier vos identifiants et réessayer'))

        );

    }
    logout(): void{
        localStorage.clear();
        this.router.navigateByUrl("/");
    }



    refreshToken(refresh_token: refreshToken): Observable<accessToken>{
        return this.http.post<accessToken>(`${environment.ApiUrl}/refresh-token`, refresh_token).pipe(
            tap(
                (response: accessToken) => {
                    localStorage.setItem("access_token", response.access_token)
                }
            ),
            catchError(err=>this.errorHandler.handleError(err,'Echec de la reconnection automatique.Veuillez vous reconnecter manuellement'))
        );
    }

}
