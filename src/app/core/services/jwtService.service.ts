import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { jwtPayload } from "../types/jwtPayload.type";
@Injectable(
    {
        providedIn:'root'
    }
)
export class JwtService {

    hasRole(token: string | null,role:string):boolean {
        const decoded = this.decodeToken(token);
        if ((decoded as any).role === role) {
            return true;
        } else {
            return false;
        }
    }

    decodeToken(token: string | null):jwtPayload|null {
        try {
            if (token != null) {
                return jwtDecode(token)
            }
            else {
                console.log("Pas de token");
                return null
            }
        }
        catch (error) {
            console.log("Invalid token", error)
            return null;
        }
    }

    isValidToken(token: string | null): boolean {
        const decoded = this.decodeToken(token);
        if (token != null &&  decoded){
            const currentTimestamp = Math.floor(Date.now() / 1000);
            return decoded.exp>currentTimestamp;
        }
        else {
            return false;
        }
    }

}


