import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, pipe } from "rxjs";
import { AuthService } from "../services/authService.service";
import { JwtService } from "../services/jwtService.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService,private jwtService:JwtService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        if (this.jwtService.isValidToken(access_token)) {
            const headers = new HttpHeaders()
                .append('Content-Type', 'Application/json')
                .append('Authorization', `Bearer ${access_token}`)
            const modifReq = req.clone({ headers });
            return next.handle(modifReq);
        }
        else if (this.jwtService.isValidToken(refresh_token)) {
            this.auth.refreshToken(refresh_token).subscribe();
            const token = localStorage.getItem('access_token');
            const headers = new HttpHeaders()
                .append('Content-Type', 'Application/json')
                .append('Authorization', `Bearer ${token}`)
            const modifReq = req.clone({ headers });
            return next.handle(modifReq);


        }
        else {
            return next.handle(req);
        }


    }

}
