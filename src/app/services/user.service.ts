import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import { User } from '../models/user';
import { UserP } from '../models/userP';

// This will allow us to access functions behind the login wall, this is a header with Bearer token and content type
// We are getting the token from the local storage(current session)
const httpOptions = {

  headers: new HttpHeaders({'content-type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`})
};
const httpOptionR = {

  headers: new HttpHeaders({'content-type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServiceUrl = 'https://api.4aithings.com';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient){
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Admins can access this on Dashboard
  public getUsers(): Observable<User[]>{
    return this.http.get<any>(`${this.apiServiceUrl}/user/all`,httpOptions)
  }

  // Admins can access this on Dashboard
  public getUser(id: number): Observable<User>{
    return this.http.get<any>(`${this.apiServiceUrl}/user/find/${id}`,httpOptions)

  }

  //This action only allowed for admin user only
  public addUser(user: NgForm): Observable<any>{

    return this.http.post<UserP>(`${this.apiServiceUrl}/user/add`, {
      id: user.value.id,
      password: user.value.password,
      username : user.value.username,
      role: user.value.role.id,
      employee: {
          id: user.value.employee.id,
      }

    }, httpOptions)
  }

  // This action will be triggered by the new user, all requered info will be send with the body
  public registerNew(user: NgForm): Observable<any>{
    return this.http.post<UserP>(`${this.apiServiceUrl}/auth/registration`, {
    email:user.value.email,
    password:user.value.password,
    matchingPassword:user.value.matchingPassword,
    firstName:user.value.firstName,
    lastName:user.value.lastName
    }, httpOptionR)
  }

  //reset email will be sent for the user if the email is valid and registered before
  public resetPass(email:string): Observable<any>{
    return this.http.post<UserP>(`${this.apiServiceUrl}/auth/resetPassword?email=${email}`, httpOptionR)
  }

  //This method called when the user submit the new password, token will be checked on the backend
  public resetChangePass(changePass:NgForm, token: string): Observable<any>{
    return this.http.post<UserP>(`${this.apiServiceUrl}/auth/savePassword`, {
      token:token,
      newPassword:changePass.value.newPassword
      }, httpOptionR)
  }

  // this method called when the logged in user hit the change password button the auth token added to the header and the old and new password will added to the body
  public changePass(changePass:NgForm): Observable<any>{
    const httpOptions = {

      headers: new HttpHeaders({'content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`})
    };
    console.log(httpOptions)
    return this.http.post<any>(`${this.apiServiceUrl}/user/updatePassword`, {
      oldPassword:changePass.value.oldPassword,
      newPassword:changePass.value.newPassword
      }, httpOptions)
  }

  //This will check the token and if valid it will verify the user email
  public confirmRegistration(token: String): Observable<any>{

    return this.http.get<any>(`${this.apiServiceUrl}/auth/registrationConfirm?token=${token}`, httpOptionR)
  }

  // Admins task only
  public updateUser(user: NgForm): Observable<User>{
    return this.http.put<User>(`${this.apiServiceUrl}/user/update`,{
      id: user.value.id,
      password: user.value.password,
      active: user.value.active,
      username : user.value.username,
      role: user.value.role.id,
      employee: {
          id: user.value.employee.id,
      }
    }, httpOptionR)
  }

  //Admin task only
  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/user/delete/${userId}`,httpOptions)
  }

}
