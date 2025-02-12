import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, pipe, switchMap, take, map, EMPTY } from "rxjs";
import { AuthService } from "../services/authService.service";
import { JwtService } from "../services/jwtService.service";
import { refreshToken } from "../types/refreshToken.type";
import { accessToken } from "../types/accessToken.type";
import { Router } from "@angular/router";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private jwtService: JwtService,private router:Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        console.log("requete en cours");
        if (req.url.includes('/refresh-token') || req.url.includes('/login')) {
            return next.handle(req);
        }
        else if (access_token != null && this.jwtService.isValidToken(access_token)) {
            console.log("access token handling request");
            const headers = new HttpHeaders()
                .append('Content-Type', 'Application/json')
                .append('Authorization', `Bearer ${access_token}`)
            const modifReq = req.clone({ headers });
            return next.handle(modifReq);
        }
        else if (refresh_token != null && this.jwtService.isValidToken(refresh_token)) {
            console.log("refresh token handling request");
            const refresh: refreshToken = {
                refresh_token
            }

            return this.auth.refreshToken(refresh).pipe(
                switchMap(
                    (token: accessToken) => {
                        const headers = new HttpHeaders()
                            .append('Content-Type', 'Application/json')
                            .append('Authorization', `Bearer ${token.access_token}`)
                        const modifReq = req.clone({ headers });
                        return next.handle(modifReq);
                    }
                )

            );
        }
        else  {
            this.auth.logout();
            console.log(" handling normal request");
            return EMPTY;
        }


    }

}
