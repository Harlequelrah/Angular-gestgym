import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtService } from "../services/jwtService.service";

@Injectable(
    {
        providedIn: "root"
    }
)
export class AuthGuard implements CanActivate{

    constructor(private router:Router,private jwtService:JwtService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const access_token = localStorage.getItem("access_token");
        if ( access_token== null ||  ! this.jwtService.isValidToken(access_token) )
        {
            this.router.navigateByUrl("/");
            return false;

        }
        else {
            return true;
        }
    }

}
