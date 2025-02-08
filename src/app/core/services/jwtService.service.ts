import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { jwtPayload } from "../types/jwtPayload.type";
@Injectable(
    {
        providedIn: 'root'
    }
)
export class JwtService {

    getUsername(): string | null{
        const token = localStorage.getItem("access_token");
        if (token && this.isValidToken(token)) {
            const decoded = this.decodeToken(token);
            if (decoded)
            {
                console.log(decoded);
                return decoded.sub
            }
        }
        return null;

    }

    hasRole(role: string): boolean {
        const token = localStorage.getItem("access_token");
        if (token && this.isValidToken(token))
        {
            const decoded = this.decodeToken(token);
            if ((decoded as any).role === role) {
                return true;
            }
        }
        return false;

    }

    decodeToken(token:string): jwtPayload | null {
        try {
            if (token) {
                return jwtDecode(token);
            }
            return null;
        }
        catch (error) {
            console.log("Invalid token", error)
            return null;
        }
    }

    isValidToken(token:string): boolean {
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


