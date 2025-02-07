import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { jwtPayload } from "../types/jwtPayload.type";
@Injectable(
    {
        providedIn: 'root'
    }
)
export class JwtService {

    hasRole(token: string , role: string): boolean {
        const decoded = this.decodeToken(token);
        if ((decoded as any).role === role) {
            return true;
        } else {
            return false;
        }
    }

    decodeToken(token: string): jwtPayload | null {
        try {
            return jwtDecode(token);
        }
        catch (error) {
            console.log("Invalid token", error)
            return null;
        }
    }

    isValidToken(token: string): boolean {
        const decoded = this.decodeToken(token);
        if (decoded) {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTimestamp;
        }
        else {
            return false;
        }
    }

}


