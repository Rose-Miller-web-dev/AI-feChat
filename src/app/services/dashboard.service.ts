import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl ='https://api.4aithings.com';

  constructor(private http: HttpClient) {}

  getUsageByStatus(status: string, userId: string): Observable<any> {
    const url = `${this.baseUrl}/api/process/getUsageByStatus?status=${status}&userId=${userId}`;
    return this.http.get(url, { headers: { 'accept': '*/*' } });
  }

  getUsageByTypeByStatus(status: string,type: string, userId: string): Observable<any> {
    const url = `${this.baseUrl}/api/process/getUsageByTypeByStatus?status=${status}&type=${type}&userId=${userId}`;
    return this.http.get(url, { headers: { 'accept': '*/*' } });
  }
}
