import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private url = 'http://localhost:3000/enroll';
  constructor(private http: HttpClient ) { }

  enroll(user: User) {
    return this.http.post<any>(this.url, user)
    .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.log(error.headers);
      console.error(
        `Backend returned code = ${error.status}, ` +
        `statusText =  ${error.statusText}, ` +
        // `url = ${error.url}, ` +
        // `ok = ${error.ok}, ` +
        `body was = ${error.error},` +
        `message= ${error.message}, ` +
        `name = ${error.name}, ` +
        `type = ${error.type} ` +
        `headers = ${error.headers} `
        );
        throw error;
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
