import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { JwtResponce } from '../models/JwtResponce';

interface LoginResponse {
  access_token: string;
  data: any;
  name: string;
  status: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

   // API path
   basePath = 'https://api.4aithings.com';

   constructor(
     private router: Router,
     private http: HttpClient
   ) { }

   // Http Options
   httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   };

   // Handle errors
   handleError(error: HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
       console.error('An error occurred:', error.error.message);
     } else {
       console.error(
         `Backend returned code ${error.status}, ` +
         `body was: ${error.error}`);
     }
     return throwError(
       'Something bad happened; please try again later.');
   }


   // Verify user credentials on server to get token
   loginForm(data: any): Observable<JwtResponce> {
    alert(data.email)
    localStorage.clear();
     return this.http
       .post<JwtResponce>(this.basePath + '/auth/login', data, this.httpOptions)
       .pipe(
         retry(2),
         catchError(this.handleError)
       );
   }

   // After login save token and other values(if any) in localStorage, this will allow as to grant authority for our user and
   //we weill tis token to while sending a request to the backend
   setUser(resp: JwtResponce) {
    alert(resp.jwtToken);
    localStorage.clear();
     localStorage.setItem('name', resp?.user?.firstName +" " + resp?.user?.lastName);
     localStorage.setItem('access_token', resp.jwtToken);
     localStorage.setItem('role', resp?.user?.roles[0]?.name);
     localStorage.setItem('email', resp?.user?.email);

     if(resp?.user?.roles[0]?.name == "ROLE_ADMIN"){
       this.router.navigate(['/home']);

     }
     else{
       this.router.navigate(['/home']);

     }
   }

   // Checking if token is set
   isLoggedIn() {
     return localStorage.getItem('access_token') != null;
   }

   getToken(){
     return localStorage.getItem('access_token');
   }


   // After clearing localStorage redirect to login screen
   logout() {
     localStorage.clear();
     this.router.navigate(['/auth/login']);
   }


}
