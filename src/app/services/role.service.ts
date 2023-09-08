import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
})
};
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiServiceUrl = 'http://localhost:4045';

  constructor(private http: HttpClient){}

  public getRoles(): Observable<Role[]>{
    return this.http.get<any>(`${this.apiServiceUrl}/role/all`, httpOptions)
  
  }
  public addRole(role: Role): Observable<Role>{
    return this.http.post<Role>(`${this.apiServiceUrl}/role/add`, role, httpOptions)
  }
  public updateRole(role: Role): Observable<Role>{
    return this.http.put<Role>(`${this.apiServiceUrl}/role/update`, role, httpOptions)
  }
  public deleteRole(roleId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/role/delete/${roleId}`, httpOptions)
  }

}