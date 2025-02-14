import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error: HttpErrorResponse, message: string | null) {

    console.error('Erreur API:', error);
    if (message) { alert(message) }
    else {
      alert(`Error API : ${error.message}`);
    }


    return throwError(() => new Error('Une erreur est survenue.'));
  }
}
