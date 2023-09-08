import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signupUser(payload: any) {
    const url = 'https://api.4aithings.com/api/users/add';
    const headers = {
      'accept': '*/*',
      'Content-Type': 'application/json'
    };

    return this.http.post(url, payload, { headers });
  }

}
