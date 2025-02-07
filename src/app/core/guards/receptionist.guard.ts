import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { JwtService } from "../services/jwtService.service";
import { Injectable } from "@angular/core";




@Injectable(
    {
        providedIn: "root"
    }
)
export class ReceptionistGuard implements CanActivate
{
    constructor(private jwtService:JwtService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const access_token = localStorage.getItem("access_token");
        const decoded = this.jwtService.decodeToken(access_token);
        if(decoded && decoded.role === "RECEPTIONIST"){
            return true
        }
        else {
            return false;
        }

    }

}
